const express = require("express");
const Product = require("../models/Productmodal")
const User = require("../models/User")
const productApi = require("../products/products")


const prodrouter = express.Router()

prodrouter.post("/", async (req, res) => {
    console.log("route hit")
    await Product.remove({})
    const insertProductInDb = await Product.insertMany(productApi.products)

    await User.remove({})
    const insertuser = await User.insertMany(productApi.users)
    res.send({ insertProductInDb, insertuser })
})

module.exports = prodrouter
