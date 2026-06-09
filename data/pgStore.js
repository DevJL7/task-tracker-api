const { pool } = require('./db');

const DEFAULT_TASKS = [
    { title: 'Task 1', description: 'Task 1 description' },
    { title: 'Task 2', description: 'Task 2 description' },
    { title: 'Task 3', description: 'Task 3 description' },
    { title: 'Task 4', description: 'Task 4 description' },
    { title: 'Task 5', description: 'Task 5 description' }
];

async function initPgStore() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT FALSE
        )
    `);

    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM tasks');
    if (rows[0].count === 0) {
        for (const task of DEFAULT_TASKS) {
            await pool.query(
                'INSERT INTO tasks (title, description, completed) VALUES ($1, $2, false)',
                [task.title, task.description]
            );
        }
    }
}

async function getAllTasks() {
    const { rows } = await pool.query(
        'SELECT id, title, description, completed FROM tasks ORDER BY id ASC'
    );
    return rows;
}

async function getTaskById(id) {
    const { rows } = await pool.query(
        'SELECT id, title, description, completed FROM tasks WHERE id = $1',
        [id]
    );
    return rows[0] || null;
}

async function createTask(title, description) {
    const { rows } = await pool.query(
        `INSERT INTO tasks (title, description, completed)
         VALUES ($1, $2, false)
         RETURNING id, title, description, completed`,
        [title, description]
    );
    return rows[0];
}

async function updateTaskCompleted(id, completed) {
    const { rows } = await pool.query(
        `UPDATE tasks SET completed = $1
         WHERE id = $2
         RETURNING id, title, description, completed`,
        [completed, id]
    );
    return rows[0] || null;
}

async function deleteTask(id) {
    const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return rowCount > 0;
}

module.exports = {
    initPgStore,
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskCompleted,
    deleteTask
};
