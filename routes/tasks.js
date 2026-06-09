const router = require('express').Router();
const {
    tasks,
    saveTasks,
    getNextId,
    findTaskById,
    findTaskIndexById,
    parseTaskId
} = require('../data/store');

router.get('/', (req, res) => {
    res.json(tasks);
});

router.get('/:id', (req, res) => {
    const id = parseTaskId(req.params.id);
    if (id === null) {
        return res.status(400).json({ error: 'Invalid task id' });
    }

    const task = findTaskById(tasks, id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

router.post('/', (req, res) => {
    if (!req.body?.title?.trim() || !req.body?.description?.trim()) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const newTask = {
        id: getNextId(tasks),
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

router.patch('/:id', (req, res) => {
    const id = parseTaskId(req.params.id);
    if (id === null) {
        return res.status(400).json({ error: 'Invalid task id' });
    }

    if (typeof req.body.completed !== 'boolean') {
        return res.status(400).json({ error: 'completed must be a boolean' });
    }

    const task = findTaskById(tasks, id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = req.body.completed;
    saveTasks(tasks);
    res.json(task);
});

router.delete('/:id', (req, res) => {
    const id = parseTaskId(req.params.id);
    if (id === null) {
        return res.status(400).json({ error: 'Invalid task id' });
    }

    const index = findTaskIndexById(tasks, id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(index, 1);
    saveTasks(tasks);
    res.status(204).send();
});

module.exports = router;
