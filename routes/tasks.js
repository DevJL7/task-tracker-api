const router = require('express').Router();
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskCompleted,
    deleteTask,
    parseTaskId
} = require('../data/store');

router.get('/', async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseTaskId(req.params.id);
        if (id === null) {
            return res.status(400).json({ error: 'Invalid task id' });
        }

        const task = await getTaskById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (!req.body?.title?.trim() || !req.body?.description?.trim()) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const newTask = await createTask(
            req.body.title.trim(),
            req.body.description.trim()
        );
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const id = parseTaskId(req.params.id);
        if (id === null) {
            return res.status(400).json({ error: 'Invalid task id' });
        }

        if (typeof req.body.completed !== 'boolean') {
            return res.status(400).json({ error: 'completed must be a boolean' });
        }

        const task = await updateTaskCompleted(id, req.body.completed);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseTaskId(req.params.id);
        if (id === null) {
            return res.status(400).json({ error: 'Invalid task id' });
        }

        const deleted = await deleteTask(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
