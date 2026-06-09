const jsonStore = require('./jsonStore');
const pgStore = require('./pgStore');

function usePostgres() {
    return Boolean(process.env.DATABASE_URL);
}

function getStore() {
    return usePostgres() ? pgStore : jsonStore;
}

function parseTaskId(rawId) {
    const id = parseInt(rawId, 10);
    if (Number.isNaN(id) || id < 1) {
        return null;
    }
    return id;
}

async function initStore() {
    const store = getStore();
    if (usePostgres()) {
        await store.initPgStore();
    } else {
        await store.initJsonStore();
    }
}

async function getAllTasks() {
    return getStore().getAllTasks();
}

async function getTaskById(id) {
    return getStore().getTaskById(id);
}

async function createTask(title, description) {
    return getStore().createTask(title, description);
}

async function updateTaskCompleted(id, completed) {
    return getStore().updateTaskCompleted(id, completed);
}

async function deleteTask(id) {
    return getStore().deleteTask(id);
}

function getStorageType() {
    return usePostgres() ? 'postgres' : 'json';
}

module.exports = {
    initStore,
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskCompleted,
    deleteTask,
    parseTaskId,
    getStorageType
};
