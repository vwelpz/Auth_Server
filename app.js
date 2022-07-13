// to handle routing logic

const express = require('express');
const database = require('./database');
const { now } = require('./Managers/time');

const app = express();

app.get('/', (req, res) => {
   return res.json({hello: 'world'});
});

app.get('/now', (req,res) => {
    return now().then((time) => {
        return res.json({ now:time});
    });
});

module.exports = app;


