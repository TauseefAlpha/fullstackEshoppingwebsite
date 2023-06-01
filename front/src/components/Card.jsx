import { Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import axios from "axios"
import React, { useContext } from "react";
import { wholeshop } from '../store/StoreContex';
import { useNavigate } from "react-router-dom"






function Card(props) {
    const { state, dispatch } = useContext(wholeshop)
    const { cart } = state
    console.log('cart data show here', cart)
    const navigate = useNavigate();

    const addtocarthandler = async (item) => {
        const existItem = cart.cartitems.find((x) => x._id === item._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`http://localhost:5040/products/${item._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        dispatch({ type: "Addtocart", payload: { ...item, quantity }, })
        navigate('/cart')
        console.log("cart handling", state)

    };

    return (
        <>
            <div className="card mb-3" style={{ boxShadow: "-5px -5px 10px rgba(255,255,255,0.4),2px 2px 5px rgba(94,104,121,0.3" }}  >
                <Link to={`/product/${props.slug}`}><img src={props.image} style={{ height: "80vh" }} className="card-img-top" alt="img" /></Link>
                <div className="card-body">
                    <p className="card-title">Trans-Weight Water Proof <b>{props.name}</b></p>
                    <b> <span className='text-secondary'><s>$45.00</s></span>
                        <span> &nbsp;&nbsp;${props.price}</span></b><br />
                    <Rating name="size-small" defaultValue={props.rating} size="small" /> <label style={{ color: "gold", fontSize: "15", fontWeight: "bold" }}> {props.reviews} reviews</label><br />
                    <Link className='d-grid' style={{ textDecoration: 'none' }} to={`/product/${props.slug}`}> <button title='View Product' className='btn btn-danger mt-2 me-2'><VisibilityOutlinedIcon />Product Detail</button></Link >
                    {/* <Link style={{ textDecoration: 'none' }} className='d-grid' to={`/product/${props.slug}`}> <button title='View Product' className='btn btn-danger mt-2 me-2'>Product Detail</button></Link > */}
                    {/* <button title='Add to Wishlist' className='btn btn-outline-danger mt-2 me-2'><FavoriteBorderIcon /></button> */}
                    {props.product.countInStock === 0 ? <button className='btn btn-outline-danger'>Outof Stock</button> :
                        <div className='text-center'><button className='btn btn- btn-outline-danger mt-2 btn-sm' onClick={() => { addtocarthandler(props.product) }}><AddShoppingCartIcon /></button></div>}
                </div>
            </div>
        </>
    )
}

export default Card