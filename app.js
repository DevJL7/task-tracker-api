const express = require('express');
const cors = require('cors');

const { getStorageType } = require('./data/store');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: 'Task Tracker API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /health',
            tasks: 'GET /tasks',
            task: 'GET /tasks/:id',
            create: 'POST /tasks',
            update: 'PATCH /tasks/:id',
            delete: 'DELETE /tasks/:id'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', storage: getStorageType() });
});

app.use('/tasks', require('./routes/tasks'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
