const { body } = require("express-validator");
const { singleImage, checkError, multipleImage } = require("../utils/validator")


const createCategory = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    checkError(),
    singleImage({ name: "image" })
]


const editCategory = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    singleImage({ name: "image", nullable: true }),
    checkError()
]


const createProduct = [
    body("name").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("isFeatured").notEmpty().toBoolean().isBoolean(),
    body("price").notEmpty().isInt().toInt(),
    body("categoryId").notEmpty().isInt(),
    singleImage({ name: "thumbnail" }),
    multipleImage({ name: "images", min: 2, max: 10 }),
    checkError()
]


const editProduct = [
    body("name").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("isFeatured").notEmpty().isBoolean(),
    body("sizes.*.name").trim().notEmpty(),
    body("sizes.*.price").notEmpty().isInt(),
    body("sizes.*.isDefault").notEmpty().isBoolean(),
    multipleImage({ name: "images", min: 2, max: 10, nullable: true }),
    checkError()
]


const createSlider = [
    singleImage({ name: "image" })
]


module.exports = {
    createCategory,
    editCategory,
    createProduct,
    editProduct,
    createSlider
}