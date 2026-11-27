while pgrep -f "gravar.js|gerar_audio.py" >/dev/null || pgrep -f "for n in paes zaqueu" >/dev/null; do sleep 15; done
for n in daniel moises ester samaritano criancas prodigo pesca; do SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 gerar_audio.py $n && node gravar.js $n || echo "FALHOU $n"; done
