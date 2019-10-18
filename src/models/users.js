import { Sequelize, sequelize } from '../database/config.js'
// Define a mapping between a table and a model
const User = sequelize.define('profiles', {
    height: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    bloodGroup: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['A', 'B', 'AB', 'O']]
        }
    }
}, {
    getterMethods : {
        userDetails () {
            return this.height + ' ' + this.bloodGroup
        }
    }
    }, {
        setterMethods : {
            setProfile (details) {
                const splitDetails = details.split(' ')
                this.setDataValue('height', splitDetails.slice(0, -1).join(''))
                this.setDataValue('bloodGroup', splitDetails.slice(-1).join(' '))
            }
        }
    }
);

module.exports = User