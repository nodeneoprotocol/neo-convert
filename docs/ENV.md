# ENV.md — Variáveis de Ambiente

## .env.local (desenvolvimento)

```bash
# ─── FLOWPAY API (Pix centralizado na stack NEO) ─────────
FLOWPAY_API_URL=https://api.flowpay.cash
FLOWPAY_INTERNAL_API_KEY=SUA_FLOWPAY_INTERNAL_API_KEY
# Opcional (alias legado aceito): FLOWPAY_API_KEY=

# ─── MAILTRAP (Email transacional) ───────────────────────
MAILTRAP_API_TOKEN=
MAILTRAP_FROM_EMAIL=no-reply@neo-convert.com
MAILTRAP_FROM_NAME=NeoConvert

# ─── APP ─────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## .env.production (Vercel)

Configurar em: **Vercel Dashboard → Project → Settings → Environment Variables**

```bash
FLOWPAY_API_URL=https://api.flowpay.cash
FLOWPAY_INTERNAL_API_KEY=PROD_FLOWPAY_INTERNAL_API_KEY
# Opcional (alias legado): FLOWPAY_API_KEY=PROD_FLOWPAY_INTERNAL_API_KEY
MAILTRAP_API_TOKEN=PROD_MAILTRAP_TOKEN
MAILTRAP_FROM_EMAIL=no-reply@neo-convert.com
MAILTRAP_FROM_NAME=NeoConvert
NEXT_PUBLIC_APP_URL=https://neo-convert.site
```

---

## Como obter cada chave

### FlowPay API (Pix)
1. Usar endpoint canônico `https://api.flowpay.cash`
2. Solicitar `FLOWPAY_INTERNAL_API_KEY` no projeto central da FlowPay
3. Não criar webhook Woovi no `neo-convert` (webhook fica centralizado na FlowPay)
4. `FLOWPAY_SIGNATURE_SECRET`/`FLOWPAY_WEBHOOK_SECRET` não são usados no checkout (são segredos de webhook)

### Mailtrap (Email)
1. Criar conta em [mailtrap.io](https://mailtrap.io)
2. Ir em **Email Sending → API Tokens**
3. Configurar remetente válido para produção

---

## Segurança

- Nunca commitar `.env.local` no git (já está no `.gitignore`)
- Rotacionar chaves se comprometidas
- `FLOWPAY_INTERNAL_API_KEY` deve existir apenas em ambiente seguro (Vercel/CI secrets)
