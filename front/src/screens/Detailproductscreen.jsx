import React, { useContext, useEffect, useReducer, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"
import { Rating } from '@mui/material';
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from "../utilis"
import { wholeshop } from '../store/StoreContex'




const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };

        case "FETCH_SUCCESS":
            return { ...state, loading: false, product: action.payload };

        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}

function Detailproductscreen() {

    const params = useParams();
    const { slug } = params

    const navigate = useNavigate()
    // ===
    const [{ loading, error, product }, dispatch] = useReducer((reducer), {
        product: [],
        loading: true,
        error: ''

    })

    useEffect(() => {
        const getdata = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get(`http://localhost:5040/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        };
        getdata();
    }, [slug])

    const { state, dispatch: ctdispatch } = useContext(wholeshop);
    const { cart } = state

    const addtocart = async () => {

        const existItem = cart.cartitems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`http://localhost:5040/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctdispatch({ type: "Addtocart", payload: { ...product, quantity }, })
        navigate('/cart')
        console.log("cart handling", state)


    }


    return loading ? (
        <div className='text-center'>
            <LoadingBox />
        </div>
    ) : error ? (<div className='text-center'><MessageBox /></div>) : (

        <div className='row m-2' style={{
            border: "2px solid grey",
            borderRadius: "25px",
        }}>
            <div className="col-md-5">
                <img className='imglarge'
                    style={{height: "80vh"}}
                    src={product.image}
                    alt={product.name}
                />
            </div>
            <div className="col-md-6 m-1">
                <ListGroup varient="grey">
                    <ListGroup.Item >
                        <Helmet>
                            <title style={{ color: 'green', fontFamily: "Sofia, sans-serif" }} >{product.name}</title>
                        </Helmet>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <h2>Title:{product.name}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <Rating name="size-small" defaultValue={product.rating} size="large" />
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <h1>Price:{product.price}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        <h1>Description:{product.desc}</h1>
                    </ListGroup.Item>
                </ListGroup>

                <Card>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>
                                <div className='row'>
                                    <div className='col' >Price:</div>
                                    <div className='col'>{product.price}</div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className='row'>
                                    <div className='col' >Status:</div>
                                    <div className='col' >
                                        {product.countInStock > 0 ? <Badge bg="success">In Stock</Badge> :
                                            <Badge bg="Danger">Unavilable</Badge>
                                        }
                                    </div>
                                </div>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button variant="primary" onClick={() => { addtocart() }}>Add to Cart</Button>
                                    </div>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Detailproductscreen