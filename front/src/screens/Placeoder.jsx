import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import Checkingoutstep from '../components/Checkingoutstep'
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { wholeshop } from '../store/StoreContex'
import { Link, useNavigate } from 'react-router-dom'
import LoadingBox from "../components/LoadingBox"
import { toast } from "react-toastify"
import axios from "axios"


const reducer = (state, action) => {
    switch (action.type) {
        case 'ApiRequest':
            return {
                ...state,
                isloading: true
            };
        case 'ApiHit':
            return {
                ...state,
                isloading: false
            };
        case 'Apireqfail':
            return {
                ...state,
                isloading: false
            }
        default:
            return state
    }
}


function Placeoder() {

    const [{ isloading }, dispatch] = useReducer(reducer, {
        isloading: false,
    })
    const { state, dispatch: ctxdispatch } = useContext(wholeshop)
    const { cart, userdetail } = state
    const navigate = useNavigate()
    // Number.EPSILON to avoid issues with floating-point arithmetic. Then, it divides the result by 100 to get the rounded number with two decimal places.
    // Number.EPSILON The Number.EPSILON static data property represents the difference between 1 and the smallest floating point number greater than 1.
    const round = (num) => {
        return (Math.round(num * 100 + Number.EPSILON) / 100)
    }
    cart.itemsprice = round(
        cart.cartitems.reduce((a, c) => (a + c.quantity * c.price), 0)
    );

    cart.shippingPrice = 400;
    cart.totalPrice = cart.itemsprice + cart.shippingPrice;

    const placeOrderHandler = async () => {

        try {
            dispatch({ type: "ApiRequest" })
            const { data } = await axios.post("http://localhost:5040/user/oder", {
                orderitems: cart.cartitems,
                shippaddres: cart.shippaddres,
                paymentMethod: cart.paymentMethod,
                itemsprice: cart.itemsprice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice
            }, {

                headers: {
                    authorization: `Alphat ${userdetail.token}`,
                }

            }
            )
            ctxdispatch({ type: "clearcart" })//to store
            dispatch({ type: "ApiHit" })//to same page reducer
            localStorage.removeItem("cartitems")
            navigate(`/oder/${data.oder._id}`)


        } catch (error) {
            dispatch({ type: "Apireqfail" })
            toast.error(error.message)
        }

    }

    // console.log("oderitem going back orderItems", cart.cartitems)
    // console.log("oderitem going back shippaddres", cart.shippaddres)
    // console.log("oderitem going back paymentMethod", cart.paymentMethod)

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("./paymenthandle")
        }
    }, [cart, navigate])

    return (

        <div className="container">

            <Helmet>
                <title>PlaceOder</title>
            </Helmet>
            <Checkingoutstep step1 step2 step3 step4 />
            <div className='text-center mt-3'><h2> Oder Detail</h2></div>
            <div className="row">
                <div className="col-md-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {cart.shippaddres.name} <br />
                                <strong>Address: </strong> {cart.shippaddres.address},
                                {cart.shippaddres.city}, {cart.shippaddres.zipcode},
                                {cart.shippaddres.country}
                            </Card.Text>
                            <Link to="/shipping" className='btn btn-primary'>Edit</Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 mx-2" >
                    <Card>
                        <Card.Body>
                            <Card.Title>Payment Method Detail</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {cart.paymentMethod} <br />
                            </Card.Text>
                            <Link to="/paymenthandle" className='btn btn-primary'>Edit</Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-8">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2>total Items</h2></Card.Title>
                            <div className="row">
                                {cart.cartitems.map((itm, ind) => (
                                    <>
                                        <div className="col-md-3 my-1" ><img src={itm.image} alt={itm.name} style={{ height: "80px", width: "90px" }} /></div>
                                        <div className="col-md-2 my-1">{itm.price}</div>
                                        <div className="col-md-2 my-1"><Link to={`/product/${itm.slug}`}>{itm.name}</Link></div>
                                        <div className="col-md-2 my-1">{itm.quantity}</div>
                                        <div className="col-md-2 my-1">{itm.desc}</div>
                                    </>
                                ))
                                }
                            </div>
                            <Link to="/cart" className='btn btn-outline-primary' >Edit</Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <div className="row">
                                    <div className="col">Items</div>
                                    <div className="col">Rs{cart.itemsprice}</div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="row">
                                    <div className="col">Shipping</div>
                                    <div className="col">Rs{cart.shippingPrice}</div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="row">
                                    <div className="col">
                                        <strong> Order Total</strong>
                                    </div>
                                    <div className="col">
                                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <button
                                        type="button"
                                        onClick={placeOrderHandler}
                                        disabled={cart.cartitems.length === 0}
                                    >
                                        Place Order
                                    </button>
                                    {isloading && <LoadingBox></LoadingBox>}
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </div>

            </div>
        </div>
    )
}

export default Placeoder