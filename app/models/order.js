const { DataTypes } = require("sequelize")
const database = require("../connections/database")

module.exports = database.define("orders", {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    shippingCost: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})