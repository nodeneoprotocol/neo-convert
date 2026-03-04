# DEPLOY.md — Deploy em Produção

## Stack de Deploy

| Serviço | Uso | Custo |
|---------|-----|-------|
| **Vercel** | Hosting + Edge Functions | Free (até 100GB/mês) |
| **GitHub** | Repositório + CI/CD | Free |
| **neo-convert.site** | Domínio | ~R$50/ano |
| **FlowPay API** | Pix (gateway central da stack) | Interno |
| **Mailtrap** | Email transacional | Plano conforme uso |

---

## Passo a Passo — Primeiro Deploy

### 1. Criar repositório GitHub

```bash
cd ~/neomello/neo-convert
git init
git add .
git commit -m "feat: NeoConvert MVP - landing + pix checkout"
git remote add origin git@github.com:NEO-PROTOCOL/neo-convert.git
git push -u origin main
```

### 2. Conectar ao Vercel

```bash
# Instalar CLI Vercel (se não tiver)
pnpm add -g vercel

# Login
vercel login

# Deploy
cd ~/neomello/neo-convert
vercel

# Seguir wizard:
# - Link to existing project? No
# - Project name: neo-convert
# - Framework: Next.js (detecta automático)
```

### 3. Configurar variáveis de ambiente no Vercel

```bash
vercel env add FLOWPAY_API_URL production
vercel env add FLOWPAY_INTERNAL_API_KEY production
vercel env add MAILTRAP_API_TOKEN production
vercel env add MAILTRAP_FROM_EMAIL production
vercel env add MAILTRAP_FROM_NAME production
vercel env add NEXT_PUBLIC_APP_URL production
```

Ou via dashboard: **vercel.com → neo-convert → Settings → Environment Variables**

### 4. Configurar domínio

No painel Vercel:
1. **Settings → Domains → Add Domain**
2. Adicionar `neo-convert.site`
3. Copiar os DNS records
4. Configurar no registrador do domínio

### 5. Webhook de pagamento

Não criar webhook Woovi no `neo-convert`.
O webhook oficial fica centralizado na FlowPay API.

---

## Deploy automático (CI/CD)

Após conectar Vercel ao GitHub:
- Cada **push na `main`** → deploy automático em produção
- Cada **PR** → deploy de preview

```bash
# Workflow padrão
git add .
git commit -m "feat: nova ferramenta PDF"
git push origin main
# → Vercel deploya automaticamente em ~30s
```

---

## Monitoramento

| O que | Onde |
|-------|------|
| Logs em tempo real | `vercel logs neo-convert` |
| Analytics do site | Vercel Analytics (free) |
| Erros | Vercel Functions tab |
| Pagamentos | FlowPay API + observabilidade da stack |
| Emails | Painel Mailtrap |
