const router = require("express").Router()
const adminValidator = require("../validators/adminValidator")
const categoryController = require("../controllers/admin/categoryController")
const productController = require("../controllers/admin/productController")
const sliderController = require("../controllers/admin/sliderController")
const orderController = require("../controllers/admin/orderController")


router.get(
    "/categories",
    categoryController.getCategories
)


router.post(
    "/categories",
    adminValidator.createCategory,
    categoryController.createCategory
)


router.patch(
    "/categories/:id",
    adminValidator.editCategory,
    categoryController.editCategory
)


router.delete(
    "/categories/:id",
    categoryController.deleteCategory
)


router.get(
    "/products",
    productController.getProducts
)


router.post(
    "/products",
    adminValidator.createProduct,
    productController.createProduct
)


router.delete(
    "/products/:id",
    productController.deleteProduct
)


router.get(
    "/sliders",
    sliderController.getSliders
)


router.post(
    "/sliders",
    adminValidator.createSlider,
    sliderController.createSlider
)



router.delete(
    "/sliders/:id",
    sliderController.deleteSlider
)


router.get(
    "/orders",
    orderController.getOrders
)


router.get(
    "/orders/:id",
    orderController.getOrder
)

router.patch(
    "/orders/:id",
    orderController.editOrder
)

module.exports = router