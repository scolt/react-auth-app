const Sequelize = require('sequelize');

function initModel(db) {
    return db.define('users', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
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
        githubId: {
            type: Sequelize.STRING,
            unique: true,
            field: 'github'
        },
        linkedinId: {
            type: Sequelize.STRING,
            unique: true,
            field: 'linkedin'
        },
        password: {
            type: Sequelize.STRING,
        },
        email: {
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