# Fase Pro — DevOps

Guía para PostgreSQL persistente y flujo de equipo con ramas.

---

## Parte 1: PostgreSQL en Render (tú ejecutas)

Tu API ya soporta Postgres. Si `DATABASE_URL` existe → Postgres; si no → JSON local.

### Opción A — Añadir DB al servicio existente (recomendada)

1. [dashboard.render.com](https://dashboard.render.com)
2. **New +** → **PostgreSQL**
3. Name: `task-tracker-db` · Plan: **Free**
4. **Create Database**
5. Copia **Internal Database URL** (si API y DB están en Render) o **External** (para local)
6. Entra a tu Web Service **task-tracker-api** → **Environment**
7. **Add Variable:**
   - Key: `DATABASE_URL`
   - Value: pega la connection string
8. **Save Changes** → redeploy automático

### Verificar

```bash
curl https://task-tracker-api-bphv.onrender.com/health
```

Deberías ver:

```json
{ "status": "ok", "storage": "postgres" }
```

Crea una tarea, redeploy manual o espera — **los datos siguen ahí**.

### Opción B — Blueprint nuevo (repo desde cero en Render)

Si recreas el stack con `render.yaml` (incluye DB + web), usa **New → Blueprint** y el repo. El YAML ya define la DB vinculada.

---

## Parte 2: Postgres en local (opcional)

1. Crea DB free en [neon.tech](https://neon.tech) o usa External URL de Render
2. En tu `.env`:

```env
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
```

3. `npm run dev` → log dirá `(postgres)`

Sin `DATABASE_URL` sigues con JSON en `data/tasks.json`.

---

## Parte 3: Flujo de equipo (`main` + `develop`)

### Crear rama develop (una vez)

```bash
git checkout -b develop
git push -u origin develop
```

### Día a día

```bash
# 1. Trabajar en develop
git checkout develop
git pull

# 2. Feature branch (opcional)
git checkout -b feature/nueva-funcion

# 3. Commit + push
git add .
git commit -m "feat: descripción"
git push

# 4. Pull Request en GitHub: feature → develop
#    CI corre tests automáticamente

# 5. Cuando develop está estable → PR develop → main
#    Render (API) y Vercel (frontend) despliegan producción
```

### Proteger ramas (GitHub — tú en la web)

Repo → **Settings** → **Branches** → **Add rule**

| Rama | Reglas sugeridas |
|------|------------------|
| `main` | Require PR, require CI passing |
| `develop` | Require PR (opcional) |

---

## Parte 4: CI/CD actual

| Evento | Qué pasa |
|--------|----------|
| Push a cualquier rama | GitHub Actions → `npm test` |
| Push a `main` | Render redeploy API |
| Push a `main` (carpeta `client/`) | Vercel redeploy frontend |

---

## Checklist fase pro

- [ ] PostgreSQL creado en Render
- [ ] `DATABASE_URL` en el Web Service
- [ ] `/health` muestra `"storage": "postgres"`
- [ ] Tareas persisten tras redeploy
- [ ] Rama `develop` creada y pusheada
- [ ] (Opcional) Branch protection en GitHub
