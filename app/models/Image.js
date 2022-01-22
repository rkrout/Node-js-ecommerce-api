const { DataTypes } = require("sequelize")
const database = require("../connections/database")

module.exports = database.define("images", {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
})