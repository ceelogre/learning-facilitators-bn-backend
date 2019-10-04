import Sequelize from 'sequelize';
const sequelize = new Sequelize('postgres://localhost')

// Testing the connection
sequelize.authenticate()
.then(
    () => console.log('Db conn successful.')
)
.catch(
    (err) => {
        console.error('Db conn unsuccessful. ', err)
    }
)
module.exports = {
    sequelize,
    Sequelize
}