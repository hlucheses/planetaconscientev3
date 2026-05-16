# Lambda — Planeta Consciente contact handler

Função AWS Lambda que recebe os envios do formulário da landing page e dispara um email através do Amazon SES.

## Deploy rápido (via consola AWS)

1. **Cria a função Lambda**
   - Runtime: `Node.js 20.x`
   - Arquitectura: `arm64`
   - Memória: `256 MB`
   - Timeout: `10 s`

2. **Empacotar e fazer upload**
   ```bash
   cd lambda
   npm install
   zip -r function.zip contact-handler.mjs package.json node_modules
   ```
   Faz upload do `function.zip` em **Code → Upload from → .zip file**.
   Handler: `contact-handler.handler`.

3. **Variáveis de ambiente** (Configuration → Environment variables):

   | Nome              | Exemplo                                                      |
   |-------------------|--------------------------------------------------------------|
   | `FROM_EMAIL`      | `no-reply@planetaconsciente.org` (verificado no SES)         |
   | `TO_EMAIL`        | `planetaconscienteao@gmail.com`                              |
   | `REPLY_TO`        | (opcional) `contacto@planetaconsciente.org`                  |
   | `ALLOWED_ORIGINS` | `https://planetaconsciente.org,https://www.planetaconsciente.org` |

4. **Permissões IAM**
   No role da Lambda, adiciona uma policy com:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Action": "ses:SendEmail",
       "Resource": "arn:aws:ses:<REGIÃO>:<ACCOUNT_ID>:identity/<FROM_EMAIL>"
     }]
   }
   ```

5. **Function URL**
   - Configuration → Function URL → **Create function URL**
   - Auth type: `NONE`
   - CORS: marcar `Configure cross-origin resource sharing (CORS)`
     - `Allow-Origins`: `https://planetaconsciente.org` (e/ou `*` durante testes)
     - `Allow-Methods`: `POST, OPTIONS`
     - `Allow-Headers`: `content-type`
   - Copia o URL gerado → cola em `.env` do frontend como `VITE_CONTACT_ENDPOINT`.

## Testar

```bash
curl -X POST <FUNCTION_URL> \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Teste",
    "email":"teste@example.com",
    "interest":"Quero ser voluntário",
    "message":"Olá!",
    "locale":"pt"
  }'
```

Resposta esperada: `{"ok":true}`.

## Notas

- Em modo SES **sandbox** só consegues enviar para emails verificados. Para produção, abre o pedido em **SES → Account dashboard → Request production access**.
- O handler inclui um campo honeypot (`website`) — preenchido por bots, devolve 200 sem enviar email.
- Logs disparam em CloudWatch Logs (`/aws/lambda/<nome-da-função>`).
