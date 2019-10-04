import { Sequelize, sequelize } from '../database/config.js'
const User = sequelize.define('user', {
    height: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bloodGroup: {
        type: Sequelize.STRING
    }
}, {
    });

module.exports = User