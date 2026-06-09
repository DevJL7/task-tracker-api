const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(
    __dirname,
    process.env.NODE_ENV === 'test' ? 'tasks.test.json' : 'tasks.json'
);

const DEFAULT_TASKS = [
    { id: 1, title: 'Task 1', description: 'Task 1 description', completed: false },
    { id: 2, title: 'Task 2', description: 'Task 2 description', completed: false },
    { id: 3, title: 'Task 3', description: 'Task 3 description', completed: false },
    { id: 4, title: 'Task 4', description: 'Task 4 description', completed: false },
    { id: 5, title: 'Task 5', description: 'Task 5 description', completed: false }
];

let tasks = loadTasks();

function loadTasks() {
    if (!fs.existsSync(DATA_FILE)) {
        saveTasks(DEFAULT_TASKS);
        return [...DEFAULT_TASKS];
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
}

function saveTasks(list) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

function getNextId(list) {
    if (list.length === 0) {
        return 1;
    }
    return Math.max(...list.map((task) => task.id)) + 1;
}

async function initJsonStore() {
    tasks = loadTasks();
}

async function getAllTasks() {
    return tasks;
}

async function getTaskById(id) {
    return tasks.find((task) => task.id === id) || null;
}

async function createTask(title, description) {
    const newTask = {
        id: getNextId(tasks),
        title,
        description,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

async function updateTaskCompleted(id, completed) {
    const task = tasks.find((item) => item.id === id);
    if (!task) {
        return null;
    }
    task.completed = completed;
    saveTasks(tasks);
    return task;
}

async function deleteTask(id) {
    const index = tasks.findIndex((item) => item.id === id);
    if (index === -1) {
        return false;
    }
    tasks.splice(index, 1);
    saveTasks(tasks);
    return true;
}

module.exports = {
    initJsonStore,
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskCompleted,
    deleteTask
};
