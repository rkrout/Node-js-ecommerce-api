const { DataTypes } = require("sequelize")
const database = require("../connections/database")

module.exports = database.define("carts", {
    quantity: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
    }
})

