const database = require("../../connections/database")
const { Order, OrderStatus, OrderItem, Product, ShippingAddress } = require("../../models/models")


const getOrders = async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const offset = Number(req.query.offset) || 0

    const orders = await Order.findAll({
        raw: true,
        attributes: [
            "orders.id",
            "orders.shippingCost",
            "orders.createdAt",
            "orders.updatedAt",
            [database.col("orderStatus.name"), "status"],
            [database.fn("COUNT", database.col("orders.id")), "totalItem"],
            [database.fn("SUM", database.col("orderItems.price")), "totalPrice"]
        ],
        limit: limit,
        subQuery: false,
        offset: offset,
        group: ["orders.id"],
        include: [
            {
                model: OrderStatus,
                required: true,
                attributes: []
            },
            {
                model: OrderItem,
                attributes: []
            }
        ]
    })

    res.json(orders)
}


const getOrder = async (req, res) => {
    const orderItems = await OrderItem.findAll({
        raw: true,
        where: { 
            orderId: req.params.id 
        },
        attributes: [
            "orderItems.id",
            "orderItems.name",
            "orderItems.price",
            "product.thumbnail"
        ],
        include: {
            model: Product,
            attributes: []
        }
    })

    const shippingAddress = await ShippingAddress.findOne({
        where: {
            orderId: req.params.id
        }
    })

    res.json({
        orderItems,
        shippingAddress
    })
}


const editOrder = async (req, res) => {
    const order = await Order.findByPk(req.params.id)
    if (!order) return res.status(404).json("Order does not exist")



    if (!await OrderStatus.findByPk(req.body.statusId)) {
        return res.status(404).json("Invalid order status")
    }

    order.orderStatusId = req.body.statusId
    await order.save()

    res.json(order)
}


module.exports = {
    getOrders,
    getOrder,
    editOrder
}