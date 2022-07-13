const request = require('supertest');
const database = require('../database');
const app = require('../app');

beforeEach(() => {
    return database.query('BEGIN');
});

afterEach(() => {
    return database.query('ROLLBACK');
});

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

test('It should create new user Tom123 with password password123', () => {
    return request(app).post('/users').send({ username: 'Tom123', password: 'password123'}).expect(201);
});

test('It should create now allow duplicate user Tom123 with same password', () => {
    const appRequest = request(app);
    const payload = { username: 'Tom123', password: 'password123'};
    const differentpayload = { username: 'Tom123', password: 'password123'};
    return appRequest
        .post('/users')
        .send(payload)
        .expect(201)
        .then(() => appRequest.post('/users').send(differentpayload).expect(409));
});