const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://localhost')

class User extends Sequelize.Model {}
User.init({
username: Sequelize.STRING,
birthday: Sequelize.DATE
}, {
sequelize, modelName: 'user'
});

sequelize.sync()
.then( () => User.create({
username: 'joly',
birthday: new Date(1920, 39, 2)
}))
.then( obj => {
console.error(obj.toJSON());
});