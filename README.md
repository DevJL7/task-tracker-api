# Task Tracker — Flujo DevOps completo

API REST + frontend + CI/CD en GitHub + deploy en Render.

## Arquitectura

```text
[Dev local]  →  git push  →  [GitHub]  →  CI (tests)  →  [Render API]
                                                                    ↑
[Dev local]  →  git push  →  [GitHub]  →  [Vercel Frontend]  ─────┘
```

| Capa | Tecnología | URL |
|------|------------|-----|
| API | Express + Node | https://task-tracker-api-bphv.onrender.com |
| Frontend | Vite (vanilla JS) | Vercel (tú despliegas) |
| CI | GitHub Actions | `.github/workflows/ci.yml` |
| Datos | JSON (local) / efímero (Render) | — |

---

## 1. Desarrollo local

### API

```bash
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Abre http://localhost:5173 — apunta a tu API en Render (o cambia `.env` a `http://localhost:3000`).

---

## 2. Tests + CI (automático)

```bash
npm test
```

Cada `git push` a `main` ejecuta GitHub Actions (tests). Si fallan, no merges hasta arreglar.

---

## 3. Deploy API (Render) — ya hecho

```bash
git add .
git commit -m "tu cambio"
git push
```

Render redeploya solo. URL: https://task-tracker-api-bphv.onrender.com

---

## 4. Deploy frontend (Vercel) — tú ejecutas

1. [vercel.com](https://vercel.com) → login con GitHub
2. **Add New Project** → repo `task-tracker-api`
3. **Root Directory:** `client`
4. **Framework:** Vite
5. **Environment Variable:** `VITE_API_URL` = `https://task-tracker-api-bphv.onrender.com`
6. Deploy

Cada push a `main` actualiza frontend y API por separado.

---

## 5. Fase siguiente (producción real)

| Mejora | Para qué |
|--------|----------|
| PostgreSQL en Render | Datos permanentes |
| Rama `develop` + PRs | Flujo de equipo |
| Sentry / logs | Monitoreo errores |

---

## Endpoints API

| Método | Ruta |
|--------|------|
| GET | `/` |
| GET | `/health` |
| GET | `/tasks` |
| GET | `/tasks/:id` |
| POST | `/tasks` |
| PATCH | `/tasks/:id` |
| DELETE | `/tasks/:id` |
