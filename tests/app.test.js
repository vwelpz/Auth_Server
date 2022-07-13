const request = require('supertest');
const database = require('../database');
const app = require('../app');

afterAll(() => {
    return database.end();
});

test('It should get current time', () => {
    return request(app)
        .get('/now')
        .expect(200)
        .then((response) => {
            console.log('here');
            return expect(response.body.now).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
        });
});