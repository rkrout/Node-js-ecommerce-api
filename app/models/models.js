const User = require("./user")
const Category = require("./category")
const Product = require("./product")
const Order = require("./order")
const OrderItem = require("./orderItem")
const ShippingAddress = require("./shippingAddress")
const Cart = require("./cart")
const Image = require("./image")
const Slider = require("./slider")
const OrderStatus = require("./orderStatus")
const Role = require("./role")
const Setting = require("./setting")


Category.hasMany(Product, {
    foreignKey: {
        name: "categoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
Product.belongsTo(Category)



Product.hasMany(Cart, {
    foreignKey: {
        name: "productId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
Cart.belongsTo(Product)



Product.hasMany(Image, {
    foreignKey: {
        name: "productId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
Image.belongsTo(Product)


Product.hasMany(OrderItem, {
    foreignKey: {
        name: "productId",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    }
})
OrderItem.belongsTo(Product)


OrderStatus.hasMany(Order, {
    foreignKey: {
        name: "orderStatusId",
        onUpdate: "CASCADE",
        onUpdate: "CASCADE"
    }
})
Order.belongsTo(OrderStatus)


User.hasMany(Cart, {
    foreignKey: {
        name: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
Cart.belongsTo(User)


Role.hasMany(User, {
    foreignKey: {
        name: "roleId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
})
User.belongsTo(Role)


User.hasMany(Order, {
    foreignKey: {
        name: "userId",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    }
})
Order.belongsTo(User)


Order.hasMany(OrderItem, {
    foreignKey: {
        name: "orderId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
OrderItem.belongsTo(Order)


Order.hasOne(ShippingAddress, {
    foreignKey: {
        name: "orderId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
ShippingAddress.belongsTo(Order)


// require("../connections/database").sync({force: true})


module.exports = {
    User, 
    Category,
    Product,
    Order, 
    OrderItem,
    ShippingAddress,
    Cart,
    Image,
    Slider,
    OrderStatus,
    Role,
    Setting
}