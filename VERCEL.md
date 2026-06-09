# Deploy frontend en Vercel

UI en internet conectada a tu API en Render.

**API:** https://task-tracker-api-bphv.onrender.com

---

## Paso 1 — Entrar a Vercel

1. [vercel.com](https://vercel.com)
2. **Sign Up** o **Log In** con **GitHub** (misma cuenta que `DevJL7/task-tracker-api`)

---

## Paso 2 — Importar proyecto

1. Dashboard → **Add New…** → **Project**
2. Busca el repo **`task-tracker-api`**
3. Clic **Import**

---

## Paso 3 — Configurar (importante)

En la pantalla **Configure Project**:

| Campo | Valor |
|-------|--------|
| **Root Directory** | `client` ← clic **Edit** y elige carpeta `client` |
| **Framework Preset** | Vite (auto) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

---

## Paso 4 — Variable de entorno

En **Environment Variables**, añade:

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://task-tracker-api-bphv.onrender.com` |

Marca **Production** (y Preview si quieres).

---

## Paso 5 — Deploy

1. Clic **Deploy**
2. Espera 1–2 min
3. Te dan una URL tipo `https://task-tracker-api-xxx.vercel.app`

Abre esa URL: deberías ver la lista de tareas y poder crear / completar / eliminar.

---

## Paso 6 — Verificar

- Crear una tarea en la UI
- Refrescar la página → sigue ahí (viene de Postgres en Render)
- Abre DevTools → Network: las peticiones van a `task-tracker-api-bphv.onrender.com`

---

## Actualizaciones automáticas

Cada `git push` a **`main`** que toque `client/` → Vercel redeploya solo.

---

## Errores frecuentes

| Problema | Solución |
|----------|----------|
| Pantalla "Error: Failed to fetch" | Revisa `VITE_API_URL` en Vercel Environment |
| Build falla | Root Directory debe ser **`client`**, no la raíz del repo |
| API lenta al cargar | Cold start de Render free (~30 s la primera vez) |
| CORS error | La API ya tiene CORS; revisa que la URL no tenga `/` final |

---

## Probar local antes (opcional)

```bash
cd client
npm install
npm run dev
```

Abre http://localhost:5173
