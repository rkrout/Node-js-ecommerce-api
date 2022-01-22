const { Product, Slider, Category, Image } = require("../../models/models")
const { Op } = require("sequelize")


const getHomeData = async (req, res) => {
    const sliders = await Slider.findAll()

    const categories = await Category.findAll()

    const products = await Product.findAll({
        where: {
            isFeatured: true
        },
        raw: true,
        attributes: [
            "products.id",
            "products.name",
            "products.thumbnail",
            "products.price"
        ]
    })


    res.json({
        sliders,
        categories,
        products
    })
}


const getProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Image,
            required: true
        }
    })

    res.json(product)
}


const getProducts = async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const offset = Number(req.query.offset) || 0

    if (req.query.categoryId) {
        const products = await Product.findAll({
            limit: limit,
            offset: offset,
            subQuery: false,
            where: {
                categoryId: req.query.categoryId
            },
            attributes: [
                "products.id",
                "products.name",
                "products.thumbnail",
                "products.price"
            ],
            raw: true
        })

        return res.json(products)
    }

    if (req.query.query) {
        const products = await Product.findAll({
            limit: limit,
            offset: offset,
            subQuery: false,
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${req.query.query}%` } },
                    { description: { [Op.like]: `%${req.query.query}%` } }
                ]
            },
            attributes: [
                "products.id",
                "products.name",
                "products.thumbnail",
                "products.price"
            ],
            raw: true
        })

        return res.json(products)
    }

    const products = await Product.findAll({
        limit: limit,
        offset: offset,
        subQuery: false,
        raw: true,
        attributes: [
            "products.id",
            "products.name",
            "products.thumbnail",
            "products.price"
        ]
    })

    return res.json(products)
}


module.exports = {
    getHomeData,
    getProduct,
    getProducts
}