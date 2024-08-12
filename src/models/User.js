const { DataTypes } = require('sequelize');
const sequelize = require('../config/conect');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
<<<<<<< HEAD
    timestamps: true
=======
    timestamps: true,
>>>>>>> 369ed4def274d2f0ef876a5f9ef5b921fd8e875a
});

module.exports = User;
