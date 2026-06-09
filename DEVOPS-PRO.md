# Fase Pro — DevOps

## Checklist

- [x] PostgreSQL en Render
- [x] `DATABASE_URL` configurado
- [x] `/health` → `"storage": "postgres"`
- [x] API en Render
- [x] Frontend en Vercel
- [x] Rama `develop` + protección `main` → workflow `setup-repository.yml`

---

## Automatización en GitHub

| Workflow | Qué hace |
|----------|----------|
| **Setup Repository** | Crea rama `develop` (auto en push a `main`) |
| **Protect Main Branch** | Protege `main` (manual, 1 vez) |
| **CI** | `npm test` en PRs |

### Proteger `main` (1 vez, ~2 min)

GitHub **no permite** que el token normal de Actions cambie reglas de rama. Opciones:

**Opción A — PAT + workflow (automático tras configurar secret)**

1. GitHub → **Settings** → **Developer settings** → **Fine-grained tokens** → **Generate**
2. Repo: `task-tracker-api` · Permission: **Administration: Read and write**
3. Repo → **Settings** → **Secrets and variables** → **Actions** → **New secret**
   - Name: `REPO_SETUP_TOKEN` · Value: el PAT
4. **Actions** → **Protect Main Branch** → **Run workflow**

**Opción B — UI (sin PAT)**

Repo → **Settings** → **Branches** → **Add rule** → pattern `main` → Require PR + status check `CI / test`

---

## Vercel

**Producción:** https://task-tracker-m4wazl7ve-dev-ops12.vercel.app

Guía: [VERCEL.md](./VERCEL.md)

---

## Flujo develop → main

```bash
git checkout develop
git pull
git checkout -b feature/mi-cambio
git commit -am "feat: ..."
git push -u origin feature/mi-cambio
```

PR: `feature/*` → `develop` → CI → merge → PR `develop` → `main` → deploy

---

## CI/CD

| Evento | Resultado |
|--------|-----------|
| Push / PR | GitHub Actions → `npm test` |
| Merge a `main` | Render + Vercel redeploy |
