import React, { useContext, useEffect, useReducer } from 'react'
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { wholeshop } from "../store/StoreContex"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { getError } from '../utilis'
import { Helmet } from "react-helmet-async"
import Card from "react-bootstrap/Card"
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}
function Oderscreenpreview() {
    const { state } = useContext(wholeshop)
    const { userdetail } = state
    const params = useParams();
    const { id: orderId } = params //rececieved id now convert into name OderId
    const navigate = useNavigate()

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });
    console.log("your id come here from prams", orderId)
    console.log("your token come here ", `Alphat ${userdetail.token}`)
    console.log("your data came from backend prams", order)


    useEffect(() => {

        const fetchOrder = async () => {
            try {

                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`http://localhost:5040/user/oder/${orderId}`, {
                    headers: { authorization: `Alphat ${userdetail.token}` },

                });

                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {

                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };

        if (!userdetail) {

            return navigate('/signin');
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [order, userdetail, orderId, navigate])

    return loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox style={{ color: "red" }}>{error}</MessageBox>) : (
        <>
            <div className="container">
                <Helmet><title>Order{orderId}</title></Helmet>
                <h1> your Oder <label style={{ color: 'green' }}>{orderId}</label></h1>
                <div className="row">
                    <div className="col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Shipping</Card.Title>
                                <Card.Text>
                                    <strong>Name:</strong> {order.shippaddres.name} <br />
                                    <strong>Address: </strong> {order.shippaddres.address},
                                    {order.shippaddres.city}, {order.shippaddres.zipcode},
                                    {order.shippaddres.country}
                                </Card.Text>
                                {order.isDelivered ? (
                                    <MessageBox variant="success">
                                        Delivered Date: {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                )
                                }

                            </Card.Body>
                        </Card>

                    </div>

                    <div className="col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Payment Method Detail</Card.Title>
                                <Card.Text>
                                    <strong>payment method Name:</strong> {order.paymentMethod} <br />
                                </Card.Text>
                                {
                                    order.isPaid ? <MessageBox style={{ color: "white", backgroung: 'black', borderradius: '15px' }}>You paid the amount</MessageBox> :
                                        <MessageBox style={{ color: 'red' }}>Not Paid</MessageBox>
                                }
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col md-6">
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>total Items</h2></Card.Title>
                                <ListGroup variant="flush">
                                    {console.log("oder data in map", order.oderitems)}
                                    {order.oderitems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={6} >
                                                    <img
                                                        style={{ height: "90px", width: "90px", border: "2px solid grey" }}
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid rounded img-thumbnail"
                                                    ></img>{' '}
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={3}>
                                                    <span>{item.quantity}</span>
                                                </Col>
                                                <Col md={3}>${item.price}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>


                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4">

                        <Card>
                            <Card.Title className='text-center'>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col">Items</div>
                                        <div className="col">Rs{order.itemsprice}</div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col">Shipping</div>
                                        <div className="col">Rs{order.shippingPrice}</div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col">
                                            <strong> Order Total</strong>
                                        </div>
                                        <div className="col">
                                            <strong>${order.totalPrice.toFixed(2)}</strong>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>


                    </div>
                </div>
            </div>

        </>
    )

}

export default Oderscreenpreview