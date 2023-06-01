const express = require("express")
const bcrypt = require('bcryptjs');
const User = require("../models/User")
const expressAsyncehandler = require("express-async-handler")
const { gAuthToken, middleware } = require("../Utilsflod/gAuthToken");
const { findOne, findById } = require("../models/Productmodal");

const UserRoute = express.Router()

UserRoute.post("/signin", expressAsyncehandler(async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (user) {
        // const c=bcrypt.compareSync(req.body.password, user.password)
        // console.log ("c data",c)
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin,
                token: gAuthToken(user)
            })
            return;
        }
    }
    return res.status(400).send({ message: "invalid email or password" })

}))

UserRoute.post("/signup", expressAsyncehandler(async (req, res) => {
    const nuser = await User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });
    const user = await nuser.save()
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: gAuthToken(user)
    })

}))

///update profile
UserRoute.put("/updateapi", middleware, expressAsyncehandler(async (req, res) => {
    console.log("user updated api",req.body)
    // res.send({ message: "user updated api" })
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const udateprofile = await user.save()
        res.send({
            _id: udateprofile._id,
            name: udateprofile.name,
            email: udateprofile.email,
            isAdmin: udateprofile.isAdmin,
            token: gAuthToken(udateprofile),

        })
    }
    else {
        res.status(400).send({ message: "user not found profile cannot b updated " })
    }



}))


module.exports = UserRoute

