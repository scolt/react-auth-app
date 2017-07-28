const Sequelize = require('sequelize');

function initModel(db) {
    return db.define('users', {
        firstName: {
            type: Sequelize.STRING,
            field: 'first_name'
        },
        lastName: {
            type: Sequelize.STRING,
            field: 'last_name'
        },
        vkId: {
            type: Sequelize.STRING,
            unique: true,
            field: 'vkontakte'
        },
        token: {
            type: Sequelize.STRING,
            unique: true
        }
    }, {
        freezeTableName: true
    });
}

module.exports =  {
    init: initModel
};