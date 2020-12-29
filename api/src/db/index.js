const Sequelize = require('sequelize');

const sequelize = new Sequelize('DB_NAME', 'USER_NAME', 'USER_PASSWORD', {
  host: 'localhost',
  dialect: 'mysql',
  //passer a true pour voir les différentes requêtes effectuées par l'ORM
  logging: false,
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = {
  sequelize
};
