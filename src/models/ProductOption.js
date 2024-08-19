// models/productOption.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/conect');
const Product = require('./Product'); // Importando o modelo Product para definir a associação

const ProductOption = sequelize.define('ProductOption', {
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        allowNull: true,
        defaultValue: 'square',
    },
    radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        allowNull: true,
        defaultValue: 'text',
    },
    values: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'product_options',
    timestamps: true,
});

// Definindo o relacionamento
ProductOption.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

Product.hasMany(ProductOption, {
    foreignKey: 'product_id',
    as: 'options'
});

module.exports = ProductOption;
