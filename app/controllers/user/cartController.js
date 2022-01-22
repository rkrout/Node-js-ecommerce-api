const { Cart, Product } = require("../../models/models")


const getCarts = async (req, res) => {
    const carts = await Cart.findAll({
        where: {
            userId: req.userId
        },
        raw: true,
        attributes: [
            "carts.id",
            "carts.quantity",
            "product.price",
            "product.thumbnail"
        ],
        include: {
            model: Product,
            required: true,
            attributes: []
        }
    })


    res.json(carts)
}


const createCart = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.body.productId
        }
    })

    if (!product) return res.status(409).json("Product does not exist")

    const cart = await Cart.create({
        sizeId: req.body.sizeId,
        quantity: req.body.quantity,
        productId: req.body.productId,
        userId: req.userId
    })

    res.status(201).json(cart)
}


const deleteCart = async (req, res) => {
    const cart = await Cart.findOne({
        where: {
            userId: req.userId,
            id: req.params.id
        }
    })

    if (!cart) return res.status(404).json("Cart does not exist")

    await cart.destroy()

    res.json("Cart deleted successfully")
}


module.exports = {
    getCarts,
    createCart,
    deleteCart
}
