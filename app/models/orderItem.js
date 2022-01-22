const { DataTypes } = require("sequelize")
const database = require("../connections/database")

module.exports = database.define("orderItems", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})