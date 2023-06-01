import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { wholeshop } from "../store/StoreContex";
import NavDropdown from 'react-bootstrap/NavDropdown'
// import LinkContainer from 'react-bootstrap/LinkContainer' 
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import Dropdown from 'react-bootstrap/Dropdown';
import { getError } from "../utilis";
import axios from "axios";





function Navbar() {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(wholeshop)
    const { cart, userdetail } = state
    // console.log("cartnumber", cart.cartitems)
    // console.log("signInUser", userdetail)

    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState('')
    console.log("query value", query)



    const signoutHandler = () => {
        dispatch({ type: 'usersignout' })
        localStorage.removeItem("userdetail")
        localStorage.removeItem("saveshippaddres")
        localStorage.removeItem("paymentMethodType")
        toast.warning("user logout", { position: "top-center" })
    }


    const searchHandle = (e) => {
        e.preventDefault()
        console.log("hello search")
        //    navigate(query ? `/search/?query=${query}` : '/search');
    }

    useEffect(() => {
        const fetchcategory = async () => {
            try {
                const { data } = await axios.get("http://localhost:5040/products/catgory")
                setCategories(data)
            } catch (error) {
                toast(getError(error))
            }
        }
        fetchcategory()
    }, [])


    return (
        <>
            <nav className={`navbar navbar-expand-sm bg-light navbar-light sticky-top navbar-custom`}>
                <div className={`container-fluid navbar-custom`}>
                    <Link to="/" className="navbar-brand">
                        <img
                            id="logo"
                            src="./imgs/logo/log.png"
                            alt="logo"
                            style={{ width: "80px", height: "50px" }}
                        />
                    </Link>
                    {/* <a className="navbar-brand" href="/" style={{color:'red', fontSize:'28'}}>NETFLIX</a> */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mynavbar"
                        style={{ color: "white" }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="mynavbar">
                        <ul
                            className="navbar-nav m-auto"
                            id="topnav"
                            style={{ float: "right" }}
                        >
                            <li className="nav-item topnav mx-3">
                                <Link className="nav-link  text-secondary" to="/">
                                    <i class="fa fa-home" style={{ fontSize: "25px" }}></i> Home
                                </Link>
                            </li>
                            <li className="nav-item topnav mx-3">
                                <Link className="nav-link text-secondary" to="/slider">
                                    <i class="fa fa-sliders" style={{ fontSize: "25px" }}></i>
                                    slider
                                </Link>
                            </li>
                            <li className="nav-item topnav mx-3">
                                <Link className="nav-link text-secondary" to="/">
                                    <i
                                        class="fa fa-product-hunt"
                                        style={{ fontSize: "25px" }}
                                    ></i>
                                    Show Products
                                </Link>
                            </li>
                            <li className="nav-item topnav mx-3">
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                        category
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="bg-dark">
                                        {categories.map((category, ind) => (

                                            <Dropdown.Item key={ind} ><Link to={`/search?category=${category}`} >{category}</Link></Dropdown.Item>

                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                        {/* <form className="d-flex me-2" onSubmit={searchHandle}>
                            <input
                                className="form-control me-2"
                                type="text"
                                placeholder="Searchproduct"
                                onChange={(e) => setQuery(e.target.value)}
                            ></input>
                            <button className=" btn btn-outline-secondary" type="submit">
                                Search
                            </button>
                        </form> */}

                        <Link to="./cart">
                            <Badge
                                badgeContent={cart.cartitems.reduce((a, c) => a + c.quantity, 0)}
                                color="success"
                                style={{ sizeHeight: "24p" }}
                                className="me-3"
                            >
                                <ShoppingCartIcon style={{ color: "grey" }} />
                            </Badge>
                        </Link>
                        {userdetail ? (
                            <NavDropdown title={userdetail.name} id="basic-nav-dropdown" style={{ color: 'grey' }} className="m-2">
                                <LinkContainer to="/updateprofile">
                                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/orderhistory">
                                    <NavDropdown.Item>Order History</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <Link
                                    className="dropdown-item"
                                    to="/signin"
                                    onClick={() => { signoutHandler() }}
                                >
                                    Sign Out
                                </Link>
                            </NavDropdown>
                        ) :
                            <Link className="btn btn-outline-secondary"
                                onClick={() => { }}
                            >
                                SigIn
                            </Link>
                        }
                        <Avatar />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;

