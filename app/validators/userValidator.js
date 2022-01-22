const { body } = require("express-validator");
const { checkError } = require("../utils/validator")

const createCart = [
    body("productId").notEmpty().isInt(),
    body("sizeId").notEmpty().isInt().toInt(),
    body("quantity").notEmpty().isInt().toInt(),
    checkError()
]


const createOrder = [
    body("name").notEmpty().isString(),
    body("mobile").notEmpty().isInt().toInt(),
    body("locality").notEmpty().isString(),
    body("city").notEmpty().isString(),
    body("state").notEmpty().isString(),
    body("pincode").notEmpty().isInt(),
    checkError()
]


module.exports = {
    createCart,
    createOrder
}