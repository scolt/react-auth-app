const Sequelize = require('sequelize');
const config = require('../config');
const db = new Sequelize(config.mysql_cs, {
    logging: () => console.info('Any operation with DB')
});

const user = require('../models/user');
const models = {};

/**
 * Init the all db models, need for creating non exists tables.
 * Store all models to the "models" variable
 * @returns {Promise.<void>}
 */

function init() {
    const User = user.init(db);
    return Promise.all([
        User.sync()
    ]).then(() => {
        console.info('User database: Initialized');
        models.user = User;
    }).catch((error) => {
        console.error(error);
    });
}

module.exports = {
    db,
    init,
    models
};
