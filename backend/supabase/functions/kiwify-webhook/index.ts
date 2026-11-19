// Bíblia Play — recebe os avisos da Kiwify e atualiza a lista de assinantes.
// Publicar: supabase functions deploy kiwify-webhook --no-verify-jwt
// Segredo:  supabase secrets set KIWIFY_TOKEN=<token do webhook na Kiwify>
// URL para colar na Kiwify: https://<projeto>.supabase.co/functions/v1/kiwify-webhook
import { createClient } from "jsr:@supabase/supabase-js@2";

const TOKEN = Deno.env.get("KIWIFY_TOKEN") ?? "";
const DIA = 864e5;

async function hmacSha1Hex(key: string, msg: string) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(msg));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// eventos que liberam, que encerram na hora, e o cancelamento (vale até o fim do período pago)
const LIBERA = ["order_approved", "subscription_renewed", "compra_aprovada", "subscription_renewal"];
const ENCERRA = ["order_refunded", "chargeback", "compra_reembolsada", "subscription_late"];
const CANCELA = ["subscription_canceled", "subscription_cancelled"];

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("ok");
  const raw = await req.text();
  const sig = new URL(req.url).searchParams.get("signature") ?? "";
  if (!TOKEN || sig !== (await hmacSha1Hex(TOKEN, raw))) return new Response("assinatura inválida", { status: 401 });

  let b: any; try { b = JSON.parse(raw); } catch { return new Response("json inválido", { status: 400 }); }
  const email = String(b?.Customer?.email ?? "").trim().toLowerCase();
  if (!email) return new Response("sem e-mail", { status: 400 });

  const ev = String(b?.webhook_event_type ?? "");
  const st = String(b?.order_status ?? "");
  const freq = String(b?.Subscription?.plan?.frequency ?? "");
  const plano = /year|anual|annual/i.test(freq) ? "anual" : /month|mensal/i.test(freq) ? "mensal" : String(b?.Product?.product_name ?? "assinatura");
  const prox = b?.Subscription?.next_payment ? new Date(b.Subscription.next_payment).getTime() : null;

  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: atual } = await sb.from("assinantes").select("expira_em").eq("email", email).maybeSingle();

  let status = "ativo";
  let expira: string | null;
  if (ENCERRA.includes(ev) || ["refunded", "chargedback"].includes(st)) {
    status = "inativo"; expira = new Date().toISOString();
  } else if (CANCELA.includes(ev)) {
    status = "cancelado"; expira = atual?.expira_em ?? (prox ? new Date(prox).toISOString() : new Date().toISOString());
  } else if (LIBERA.includes(ev) || st === "paid" || st === "approved") {
    const fallback = Date.now() + (plano === "anual" ? 366 : 32) * DIA;
    expira = new Date((prox ?? fallback) + 3 * DIA).toISOString(); // 3 dias de folga para a renovação cair
  } else {
    return new Response("evento ignorado: " + ev); // boleto gerado, carrinho abandonado etc.
  }

  const { error } = await sb.from("assinantes").upsert({
    email, status, plano, expira_em: expira, ultimo_evento: ev, pedido: b?.order_id ?? null, atualizado_em: new Date().toISOString(),
  });
  if (error) return new Response(error.message, { status: 500 });
  return new Response("ok");
});
