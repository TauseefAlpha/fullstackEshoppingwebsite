const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number,
        required: true
    },
},
    {  //keep record of create and update time utomatically add field
        timestamps: true
    }

)

const Product = mongoose.model("Product", productSchema)

module.exports = Product