const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const statusEl = document.getElementById('status');
const listEl = document.getElementById('task-list');
const formEl = document.getElementById('task-form');

async function api(path, options = {}) {
    const res = await fetch(`${API}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });

    if (res.status === 204) {
        return null;
    }

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Request failed');
    }
    return data;
}

async function loadTasks() {
    statusEl.textContent = 'Cargando...';
    const tasks = await api('/tasks');
    statusEl.textContent = `${tasks.length} tareas · ${API}`;
    renderTasks(tasks);
}

function renderTasks(tasks) {
    listEl.innerHTML = '';

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'done' : '';

        li.innerHTML = `
            <label>
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <strong>${task.title}</strong>
                <span>${task.description}</span>
            </label>
            <button type="button" class="delete">Eliminar</button>
        `;

        li.querySelector('input').addEventListener('change', async (e) => {
            await api(`/tasks/${task.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ completed: e.target.checked })
            });
            loadTasks();
        });

        li.querySelector('.delete').addEventListener('click', async () => {
            await api(`/tasks/${task.id}`, { method: 'DELETE' });
            loadTasks();
        });

        listEl.appendChild(li);
    });
}

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    await api('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description })
    });

    formEl.reset();
    loadTasks();
});

loadTasks().catch((err) => {
    statusEl.textContent = `Error: ${err.message}`;
});
