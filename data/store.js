const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'tasks.json');

const DEFAULT_TASKS = [
    { id: 1, title: 'Task 1', description: 'Task 1 description', completed: false },
    { id: 2, title: 'Task 2', description: 'Task 2 description', completed: false },
    { id: 3, title: 'Task 3', description: 'Task 3 description', completed: false },
    { id: 4, title: 'Task 4', description: 'Task 4 description', completed: false },
    { id: 5, title: 'Task 5', description: 'Task 5 description', completed: false }
];

function loadTasks() {
    if (!fs.existsSync(DATA_FILE)) {
        saveTasks(DEFAULT_TASKS);
        return [...DEFAULT_TASKS];
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
}

function saveTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

function getNextId(tasks) {
    if (tasks.length === 0) {
        return 1;
    }
    return Math.max(...tasks.map((task) => task.id)) + 1;
}

function findTaskById(tasks, id) {
    return tasks.find((task) => task.id === id);
}

function findTaskIndexById(tasks, id) {
    return tasks.findIndex((task) => task.id === id);
}

function parseTaskId(rawId) {
    const id = parseInt(rawId, 10);
    if (Number.isNaN(id) || id < 1) {
        return null;
    }
    return id;
}

const tasks = loadTasks();

module.exports = {
    tasks,
    saveTasks,
    getNextId,
    findTaskById,
    findTaskIndexById,
    parseTaskId
};
