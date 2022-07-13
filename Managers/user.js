const database = require('../database');
const { POSTGRES_ERRORS } = require('../Database/error');

module.exports.create = (username, password) => {
    const query = `INSERT INTO users_tab (username, password) VALUES ($1, $2)`;
    const params = [username, password];
    return database.query(query, params).catch((error) => {
        if (error.code === POSTGRES_ERRORS.UNIQUE_VIOLATION) {
            throw new UserExistsError(username);
        } else {
            throw error;
        }
    });
};