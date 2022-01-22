const { Product, Category, ProductImage } = require("../../models/models")
const { upload, uploads, destroyes } = require("../../utils/fileSystem")


const getProducts = async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const offset = Number(req.query.offset) || 0

    const products = await Product.findAll({
        limit: limit,
        offset: offset
    })

    res.json(products)
}


const getProduct = async (req, res) => {
    const product = await Product.findOne({
        where: { id: req.params.id },
        include: { model: ProductImage }
    })

    res.json(product)
}


const createProduct = async (req, res) => {
    if (!await Category.findByPk(req.body.categoryId)) {
        return res.status(409).json("Category does not exist")
    }

    let images = await uploads(req.files.images)
    images = images.map(image => { return { image } })

    const product = await Product.create(
        {
            name: req.body.name,
            description: req.body.description,
            isFeatured: req.body.isFeatured,
            categoryId: req.body.categoryId,
            thumbnail: await upload(req.files.thumbnail),
            price: req.body.price,
            images: images
        },
        {
            include: [Image]
        }
    )

    res.status(201).json(product)
}


const deleteProduct = async (req, res) => {
    let product = await Product.findOne({
        where: { id: req.params.id },
        include: { model: Image }
    })
    if (!product) return res.status(409).json("Product does not exist")

    const images = product.images.map(({ image }) => { return image })
    await destroyes(images)
    await product.destroy()

    return res.json("Product deleted successfully")
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct
}