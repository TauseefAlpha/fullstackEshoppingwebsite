// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";
import WestIcon from "@mui/icons-material/West";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { wholeshop } from '../store/StoreContex'
import { Helmet } from "react-helmet-async";
import axios from 'axios'




function Cart() {

    const { state, dispatch } = useContext(wholeshop)
    const { cart } = state
    console.log('cart data show here', cart)
    const navigate = useNavigate();





    const Quantity = async (item, quantity) => {
        const { data } = await axios.get(`http://localhost:5040/products/${item._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        dispatch({ type: "Addtocart", payload: { ...item, quantity }, })
        navigate('/cart')
        console.log("cart handling", state)

    };
    const handleremove = (item) => {
        // console.log("remove following  item",item);
        dispatch({ type: "removeitem", payload: item })
    };

    const emptyCarts = (item) => {
        console.log("emptyCarts function");
        dispatch({ type: "removeall", payload: item })

    };
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }

    if (cart.cartitems.length === 0) {
        return (
            <>
                <h1 style={{ fontFamily: "Trirong, serif" }}>
                    Opps !Your Cart is Empty No Item present
                </h1>
                <Link to="/">
                    <WestIcon />
                    <label style={{ fontSize: "18px", fontWeight: "bold" }}>

                        Continue Shoping
                    </label>
                </Link>
            </>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <div className="text-start">

                <Link to="/">
                    <WestIcon />
                    <label style={{ fontSize: "18px", fontWeight: "bold" }}>
                        Continue Shoping
                    </label>
                </Link>
            </div>
            <div className="container ">
                <h1 className="text-center">
                    Your Cart
                </h1>
                <center>

                    <button onClick={() => emptyCarts(cart.cartitems)} className="btn btn-warning my-3">
                        <ClearIcon /> Empty Cart
                    </button>
                </center>
                <div className="d-flex justify-content-center">
                    <div className="col-md-10">
                        <table className="table table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Images</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Increment/Decrement</th>
                                    <th>Remove Item</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.cartitems?.map((itm, ind) => {
                                    console.log("selected item", itm);
                                    return (
                                        <tr key={itm._id} className="my-2">
                                            <td>
                                                <div
                                                    className="card"
                                                    style={{
                                                        width: "10rem",
                                                        height: "10rem",
                                                        borderRadius: "25%",
                                                    }}
                                                >
                                                    <img
                                                        src={itm.image}
                                                        className="card-img-top"
                                                        style={{ width: "10rem", height: "10rem" }}
                                                        alt="clockinmg"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <h3>{itm.name}</h3>
                                            </td>
                                            <td>{itm.quantity * itm.price}</td>
                                            <td>{itm.quantity}</td>
                                            <td>

                                                <button
                                                    className="btn btn-danger"
                                                    disabled={itm.quantity === 1}
                                                    onClick={() => Quantity(itm, itm.quantity - 1)}
                                                >-</button>&nbsp;
                                                <label style={{ fontSize: "23px" }}>
                                                    {itm.quantity}
                                                </label>&nbsp;
                                                <button
                                                    className="btn btn-success"
                                                    disabled={itm.quantity === itm.countInStock}
                                                    onClick={() => Quantity(itm, itm.quantity + 1)}
                                                >+</button>
                                            </td>

                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleremove(itm)}
                                                >
                                                    <DeleteOutlineIcon /> Remove Item
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <div
                                className="cartSumary mt-2"
                                style={{ border: "2px solid black" }}
                            >
                                <div>
                                    <label style={{ fontSize: "18px" }}>
                                        <h3>
                                            Subtotal ({cart.cartitems.reduce((a, c) => a + c.quantity, 0)}
                                            items) : Rs &nbsp;
                                            {cart.cartitems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                        </h3>
                                    </label>
                                </div>
                                <p>Your Total Are calculated Here</p>

                                <div className="text-center"><button
                                    className="btn btn-outline-primary"
                                    onClick={() => {
                                        checkoutHandler()
                                        // navigate("/log");
                                    }}
                                >
                                    Checkout
                                </button></div>


                                <div className="text-start mt-2">
                                    <Link to="/">
                                        <WestIcon />
                                        <label style={{ fontSize: "18px", fontWeight: "bold" }}>
                                            Continue Shoping
                                        </label>
                                    </Link>
                                </div>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
