// to handle routing logic

const express = require('express');
const userManager = require('./Managers/user');
const { now } = require('./Managers/time');
const { UserExistsError } = require('./Managers/error');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
   return res.json({hello: 'world'});
});

app.get('/now', (req,res) => {
    return now().then((time) => {
        return res.json({ now:time});
    });
});

app.post('/users', (req, res, next) => {
    const { username,password } = req.body;
    //send to database
    userManager.create(username, password)
    .then(() => {
        return res.sendStatus(201);
    })
    .catch((error) => {
        if (error instanceof UserExistsError) {
            return next(createError(409, error.message));
        }
        return next(error);
    });

    //respond accordingly
});

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(err.status || 500).json({"error": err.message || `Unknown Error!`});
});

module.exports = app;


