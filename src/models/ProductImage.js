// models/productImage.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/conect');
const Product = require('./Product'); // Importando o modelo Product para definir a associação

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // Referência ao modelo Product
            key: 'id'
        }
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'product_images',
    timestamps: true,
});

// Definindo associações
ProductImage.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

module.exports = ProductImage;
