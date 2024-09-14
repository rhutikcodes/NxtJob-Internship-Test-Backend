const { DataTypes } = require('sequelize');
const Document = require('../models/Document.js')
const sequelize = require('../config/sequelize.js');

const DocumentVersion = sequelize.define('DocumentVersion', {
    documentId: {
        type: DataTypes.INTEGER,
        references: { model: Document, key: 'id' },
    },
    content: { type: DataTypes.TEXT, allowNull: false },
    version: { type: DataTypes.INTEGER, allowNull: false },
});
module.exports = DocumentVersion;
