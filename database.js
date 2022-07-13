// Handles Database Connection

require('dotenv').config();

const pg = require('pg');

if (process.env.NODE_ENV === 'test') {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
    });
    client.connect();
    module.exports = client;
} else {
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        max:  process.env.POOL_SIZE,
        ssl: {
            rejectUnauthorized: true,
        },
        
    });

    module.exports = pool;
}