const { DataTypes } = require("sequelize")
const database = require("../connections/database")

module.exports = database.define("sliders", {
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})