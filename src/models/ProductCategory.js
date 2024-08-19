// models/productCategory.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/conect');
const Product = require('./Product');
const Category = require('./Category');

const ProductCategory = sequelize.define('ProductCategory', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    }
}, {
    tableName: 'product_categories',
    timestamps: true,
});

// Definindo associações
ProductCategory.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

ProductCategory.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});

module.exports = ProductCategory;
