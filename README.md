# Task Tracker — Flujo DevOps completo

App full-stack desplegada: frontend en Vercel, API en Render, datos en PostgreSQL.

## Producción

| Capa | URL |
|------|-----|
| **App (frontend)** | https://task-tracker-m4wazl7ve-dev-ops12.vercel.app |
| **API** | https://task-tracker-api-bphv.onrender.com |
| **Health** | https://task-tracker-api-bphv.onrender.com/health |
| **Repo** | https://github.com/DevJL7/task-tracker-api |

```bash
curl https://task-tracker-api-bphv.onrender.com/health
# {"status":"ok","storage":"postgres"}
```

## Arquitectura

```text
Usuario → Vercel (UI) → Render (API) → PostgreSQL
              ↑              ↑
         git push       git push
              └──── GitHub + CI ────┘
```

| Capa | Tecnología |
|------|------------|
| Frontend | Vite + vanilla JS (Vercel) |
| API | Express + Node (Render) |
| Datos | PostgreSQL (Render) / JSON (local sin `DATABASE_URL`) |
| CI | GitHub Actions → `npm test` |

---

## Desarrollo local

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

Abre http://localhost:5173

---

## Flujo de cambios (equipo)

```text
feature → PR a develop → CI pasa → merge
develop → PR a main     → merge → Render + Vercel redeploy
```

`main` se protege con el workflow **Protect Main Branch** o desde GitHub Settings (ver [DEVOPS-PRO.md](./DEVOPS-PRO.md)).

Guías: [DEVOPS-PRO.md](./DEVOPS-PRO.md) · [VERCEL.md](./VERCEL.md)

---

## Tests

```bash
npm test
```

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
