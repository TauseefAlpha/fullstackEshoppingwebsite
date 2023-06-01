const express = require("express")
const Odertable = require("../models/Odermodal")
const expressasynchandlere = require("express-async-handler")
const { middleware } = require("../Utilsflod/gAuthToken")


const odrRoute = express.Router();
odrRoute.post("/", middleware, expressasynchandlere(async (req, res) => {

  // const{oderitems,shippaddres,paymentMethod,itemsprice,shippingPrice,totalPrice}=req.body
  const nOder = new Odertable({
    oderitems: req.body.orderitems.map((x) => ({ ...x, product: x._id })),
    shippaddres: req.body.shippaddres,
    paymentMethod: req.body.paymentMethod,
    itemsprice: req.body.itemsprice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id //coming from middleware

  })

  const oder = await nOder.save()
  res.status(201).send({ message: 'your oder is sucessfully Created', oder });

}))

odrRoute.get("/blongme", middleware, expressasynchandlere(async (req, res) => {

  const order = await Odertable.find({ user: req.user._id })
  res.send(order)
  // res.send({message:"oderhistory",order:order})

}))

odrRoute.get('/:id', expressasynchandlere(async (req, res) => {
  const order = await Odertable.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
}))
module.exports = odrRoute