require('dotenv').config();

const app = require('./app');
const { initStore } = require('./data/store');

const PORT = process.env.PORT || 3000;

initStore()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} (${process.env.DATABASE_URL ? 'postgres' : 'json'})`);
        });
    })
    .catch((error) => {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    });
