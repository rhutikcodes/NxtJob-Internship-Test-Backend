const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
