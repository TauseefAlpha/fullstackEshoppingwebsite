const express = require("express")
const cors = require("cors")
const mongoodb = require("./dbConnection")

// const productapi = require("./products/products")
const prodrouter = require("./routes/Productroute")
const getProductroute = require("./routes/GetProductroute")
const UserRoute = require("./routes/UserAuthenticationroute")
const oderRoute = require("./routes/OderRoute")

const SearchRoute = require("./routes/SearchRoute")

// const { sign } = require("jsonwebtoken")
require('dotenv').config()


const app = express()
mongoodb()
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //using the urlencoded middleware in a Node.js application built with the Express framework. The urlencoded middleware is used to parse incoming request bodies that are encoded in URL-encoded format.
app.use(cors(["http://localhost:3000"]))

// app.use(cors({
//     origin: ["https://deploy-mern-1whq.vercel.app"],
//     methods: ["POST", "GET", "PUT", 'DELETE'],
//     credentials: true

// }))

// res.send("/", (req, res) => {
//     res.json("hello")
// })

//api base url for setting productdata and stactic admin and user to mongo 
app.use("/fst/prod", prodrouter)
// and gettingproduct data from mongo db
app.use("/products", getProductroute)
//route for user signup update
app.use("/user/auth", UserRoute)
//route for user
app.use("/user/oder", oderRoute)

//route for search
app.use("/products/mydata", SearchRoute)

app.use((error, req, res, next) => {
    res.status(500).send({ errormessage: error.message })
})

const port = process.env.PORT || 5010

app.listen(port, () => { console.log(`listening to port${port}`) })