# Task Tracker API

REST API con Express para gestionar tareas. Persistencia en archivo JSON.

## Requisitos

- Node.js 18+
- npm

## Instalación local

```bash
npm install
cp .env.example .env
npm run dev
```

La API queda en `http://localhost:3000` (o el `PORT` de tu `.env`).

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Estado del servicio |
| GET | `/tasks` | Listar tareas |
| GET | `/tasks/:id` | Obtener una tarea |
| POST | `/tasks` | Crear tarea |
| PATCH | `/tasks/:id` | Actualizar `completed` |
| DELETE | `/tasks/:id` | Eliminar tarea |

### POST `/tasks`

```json
{ "title": "Mi tarea", "description": "Detalle" }
```

### PATCH `/tasks/:id`

```json
{ "completed": true }
```

## Estructura

```text
├── index.js
├── routes/tasks.js
├── data/store.js
├── data/tasks.json
├── middleware/errorHandler.js
└── .env
```

## Scripts

| Comando | Uso |
|---------|-----|
| `npm run dev` | Desarrollo con nodemon |
| `npm start` | Producción |
