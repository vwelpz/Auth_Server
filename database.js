// Handles Database Connection

const pg = require('pg');

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: process.env.POOL_SIZE,
    ssl: {
        rejectUnauthorized: true,
    },
    
});

module.exports = pool;