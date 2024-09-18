const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');
const User = require('./userModel.js');

const Document = sequelize.define('Document', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference the User model
            key: 'id',   // Reference the 'id' field in the User table
        },
        onDelete: 'CASCADE', // Optional: Handle cascade delete if a user is deleted
    },
});

module.exports = Document;
