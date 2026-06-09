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

Al hacer push a `main`, el workflow **Setup Repository**:

1. Crea la rama `develop` si no existe
2. Protege `main` (PR obligatorio + CI `test`)

**Requisito único (una vez):** repo → **Settings** → **Actions** → **General** → **Workflow permissions** → **Read and write permissions** → Save.

Si el workflow falla por permisos, activa eso y en **Actions** → **Setup Repository** → **Re-run all jobs**.

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
