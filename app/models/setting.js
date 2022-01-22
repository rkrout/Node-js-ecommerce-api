const { DataTypes } = require("sequelize")
const database = require("../connections/database")

module.exports = database.define("settings", {
    shippingCost: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
    }
})

