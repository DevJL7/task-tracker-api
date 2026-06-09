process.env.NODE_ENV = 'test';

const fs = require('fs');
const path = require('path');
const request = require('supertest');

const testFile = path.join(__dirname, '../data/tasks.test.json');
if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile);
}

const app = require('../app');

describe('Task Tracker API', () => {
    test('GET / returns API info', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Task Tracker API');
    });

    test('GET /health returns ok', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
        expect(['json', 'postgres']).toContain(res.body.storage);
    });

    test('GET /tasks returns array', async () => {
        const res = await request(app).get('/tasks');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /tasks creates a task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ title: 'Test task', description: 'Test description' });
        expect(res.status).toBe(201);
        expect(res.body.title).toBe('Test task');
    });

    test('POST /tasks without title returns 400', async () => {
        const res = await request(app).post('/tasks').send({});
        expect(res.status).toBe(400);
    });

    test('GET /unknown returns 404', async () => {
        const res = await request(app).get('/unknown');
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Not found');
    });
});
