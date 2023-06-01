const express = require("express");
const Product = require("../models/Productmodal.js")
const productApi = require("../products/products")
const expressAsyncehandler = require("express-async-handler")


const getsearchroute = express.Router()


//search filter
getsearchroute.get("/", async (req, res) => {
    const { query } = req.query;
    Product.find({
        category: new RegExp(category, 'i'), // 'i' for case-insensitive search
    })
        .then(myData => res.json(myData))
        .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = getsearchroute