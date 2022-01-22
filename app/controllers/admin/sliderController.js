const { Slider } = require("../../models/models")
const { upload, destroy } = require("../../utils/fileSystem")


const getSliders = async (req, res) => {
    res.json(await Slider.findAll())
}


const createSlider = async (req, res) => {
    const slider = await Slider.create({
        image: await upload(req.files.image)
    })

    res.status(201).json(slider)
}


const deleteSlider = async (req, res) => {
    const slider = await Slider.findByPk(req.params.id)
    if (!slider) return res.status(404).json("Slider does not exist")

    await destroy(slider.image)
    await slider.destroy()

    return res.json("Slider deleted successfully")
}


module.exports = {
    getSliders,
    createSlider,
    deleteSlider
}