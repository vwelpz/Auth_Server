// to handle routing logic

const express = require('express');
const database = require('./database');

const app = express();

app.get('/', (req, res) => {
   return res.json({hello: 'world'});
});

app.get('/now', (req,res) => {
    return database.query(`SELECT NOW()`).then((response) => {
        const now = response.rows[0].now;
        return res.json({ now });
    });
});

module.exports = app;


