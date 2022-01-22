const { DataTypes } = require("sequelize")
const database = require("../connections/database")

module.exports = database.define("products", {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})



