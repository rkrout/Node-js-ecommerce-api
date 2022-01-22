const router = require("express").Router()
const productController = require("../controllers/user/productController")
const cartController = require("../controllers/user/cartController")
const userValidator = require("../validators/userValidator")
const { authenticate } = require("../middlewares/authMiddleware")
const orderController = require("../controllers/user/orderController")


router.get(
    "/home",
    productController.getHomeData
)


router.get(
    "/products",
    productController.getProducts
)


router.get(
    "/products/:id",
    productController.getProduct
)


router.get(
    "/cart",
    authenticate,
    cartController.getCarts 
)


router.post(
    "/cart",
    authenticate,
    userValidator.createCart,
    cartController.createCart
)


router.delete(
    "/cart/:id",
    authenticate,
    cartController.deleteCart
)


router.post(
    "/orders",
    authenticate,
    userValidator.createOrder,
    orderController.createOrder
)

router.get(
    "/orders",
    authenticate,
    orderController.getOrders
)


router.get(
    "/orders/:id",
    authenticate,
    orderController.getOrder
)


module.exports = router