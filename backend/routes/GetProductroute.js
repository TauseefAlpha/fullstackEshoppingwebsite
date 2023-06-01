const express = require("express");
const Product = require("../models/Productmodal.js")
const productApi = require("../products/products")
const expressAsyncehandler = require("express-async-handler")


const getProductroute = express.Router()

getProductroute.get("/", async (req, res) => {
    // res.send({ message: "get product here" })
    const getprod = await Product.find();
    res.send(getprod)

})

getProductroute.get("/catgory", expressAsyncehandler(async (req, res) => {

    const catogarydropdown = await Product.find().distinct("category")
    res.send(catogarydropdown)
}))



getProductroute.get("/slug/:slug", async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
    if (product) {
        res.send(product)
    }
    else {
        res.status(404).send({ message: "product not found in db" })
    }
})
getProductroute.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    }
    else {
        res.status(404).send({ message: "product not found" })
    }
})
module.exports = getProductroute
