// Handles Database Connection

require('dotenv').config();

const pg = require('pg');

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: process.env.NODE_ENV === "test" ? process.env.TEST_POOL_SIZE : process.env.POOL_SIZE,
    ssl: {
        rejectUnauthorized: true,
    },
    
});

module.exports = pool;