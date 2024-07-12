const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Purchase = sequelize.define('Purchase', {
    stockSymbol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shares: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pricePerShare: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
});

User.hasMany(Purchase, { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });

module.exports = Purchase;
