const database = require("../../connections/database")
const { Cart, Product, Order, ShippingAddress, OrderItem, OrderStatus, Setting } = require("../../models/models")


const createOrder = async (req, res) => {
    const carts = await Cart.findAll({
        where: { userId: req.userId },
        raw: true,
        attributes: [
            "product.name",
            "product.price",
            "carts.quantity",
            "carts.productId"
        ],
        include: {
            model: Product,
            required: true,
            attributes: []
        }
    })
    if (carts.length == 0) return res.status(400).json("Cart is empty")


    const { shippingCost } = await Setting.findByPk(1)


    const shippingAddress = {
        name: req.body.name,
        mobile: req.body.mobile,
        locality: req.body.locality,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode
    }
    const orderItems = carts.map(cart => { return { ...cart } })


    const order = await Order.create(
        {
            userId: req.userId,
            orderStatusId: 1,
            shippingCost: shippingCost,
            shippingAddress: shippingAddress,
            orderItems: orderItems
        },
        {
            include: [ShippingAddress, OrderItem]
        }
    )


    await Cart.destroy({ where: { userId: req.userId } })

    res.status(201).json(order)
}


const getOrders = async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const offset = Number(req.query.offset) || 0

    const orders = await Order.findAll({
        limit: limit,
        offset: offset,
        raw: true,
        subQuery: false,
        group: ["orders.id"],
        attributes: [
            "orders.id",
            "orders.shippingCost",
            [database.col("orderStatus.name"), "status"],
            [database.fn("COUNT", database.col("orderItems.id")), "totalItmes"],
            [database.fn("SUM", database.col("orderItems.price")), "totalPrice"]
        ],
        include: [
            {
                model: OrderItem,
                required: true,
                attributes: []
            },
            {
                model: OrderStatus,
                required: true,
                attributes: []
            }
        ]
    })

    res.json(orders)
}


const getOrder = async (req, res) => {
    const shippingAddress = await ShippingAddress.findOne({
        where: { orderId: req.params.id }
    })
    const orderItems = await OrderItem.findAll({
        raw: true,
        where: { 
            orderId: req.params.id 
        },
        attributes: [
            "orderItems.name",
            "orderItems.price",
            "product.thumbnail"
        ],
        include: {
            model: Product,
            attributes: []
        }
    })

    res.json({
        shippingAddress,
        orderItems
    })
}


module.exports = {
    createOrder,
    getOrders,
    getOrder
}