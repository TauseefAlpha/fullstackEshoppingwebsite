import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { wholeshop } from '../store/StoreContex';
import { toast } from "react-toastify"
import { getError } from '../utilis';
import { Helmet } from 'react-helmet-async';


function SignupForm() {

    const [logd, setLogd] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
    });
    const { state, dispatch: ctxDispatch } = useContext(wholeshop);
    const { userdetail } = state
    const navigate = useNavigate()

    //  It retrieves the value of a query parameter named "redirect" from the current URL using the URLSearchParams API, and assigns it to the reredirectInUrl variable. If the query parameter is not present or has no value,
    // the reredirectInUrl variable will be null or undefined.
    // The next line uses a ternary operator to assign either the value of reredirectInUrl or a default value of '/' to the redirect variable. This effectively sets the redirect target to the value of the "redirect" query parameter if it exists, or to the root path '/' if it does not.
    const { search } = useLocation()
    const reredirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = reredirectInUrl ? reredirectInUrl : '/';


    const setinput = (event) => {
        const { name, value } = event.target;

        setLogd({
            ...logd,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (logd.password !== logd.confirmpassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await axios.post("http://localhost:5040/user/auth/signup", {
                name: logd.name,
                email: logd.email,
                password: logd.password
            })
            console.log("data of user from db", data)
            ctxDispatch({ type: 'userLogin', payload: data });
            localStorage.setItem("userdetail", JSON.stringify(data))
            navigate(redirect || "/");
        } catch (error) {

            toast.error(getError(error), { position: "bottom-center" })
        }

    }

    useEffect(() => {

        if (userdetail) {
            navigate(redirect)
        }

    }, [navigate, redirect, userdetail])

    return (
        <div>

            <Helmet>
                <title>RigisterForm</title>
            </Helmet>
            <section
                className="vh-100 bg-image"
                style={{
                    backgroundImage: `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDw0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRMYHSggGBolGxUVITEhMSk3LjouFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAAAQIDB//EAB8QAQEBAQEAAgMBAQAAAAAAAAABERICIZFBUXFhMf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDqXRz0y05Qa9H0ylPQa6crPVSguU9RqoCgQBUMoAMAAYGEB6CMAZCgehJwAZAD0akAZaLS0D0tK1Ogu0tTqbQXpajSvoF2p6TpAwlOVnKqUFqjKVUoNNVKhUBcqpUHAXpphgqU0gFw0SqAxS0AZaAAOJOAYAADSGgARaBkKQAqeptArU2n6RQPStTam0F6Ws+hoMJVSs4ryDSLiJVeaDWLjOLgHThacBUPUgFhMPQVBpaWgrTSNBQtToBWnKjT0FaLU6NA9Gp0AYAoFaWhNBWlS0rQL1UWn6RQFqbThUE6i1XpnoJki4iLgHFxOKgNJVT0y1UBocTKcBcMoYAaCBWhOjQXpanTA9OJPQMWlooHolSegZxOjQVpaWloHaWp0rQVU0aQFU3D9VFoGmiVNoCsri/VZgIuMpV+aCpVxEOA0OJlVKCtPUDQa+arWWjoGtqdTo0FyhEo6BcGp6LQXqpWWnoNCtR0LQVpys9OUF6NR0NBWjUaNBdSNLQFpWlaWgdTThWgmoq/TO0CIJtARUT8L8guKTDAaelQCtPpnaegvRqZRoLlUiU9BVTo1IK1TOK0FaVpaVA9OVB2grRajTlA9EpFQX0J6Z6NBejU6AO0uk2loNNJEo6A7Wdp+qmgKhUHIJVKWH5n1AaGyt0Sg00aQBRFQCrS0ECvNUiAF2p0gB6qVEK0Gv0Ws1boGaR6v4AzjNXi/gFAhufIDP4JEaJQWCACws/n2XqpBXqpVfn5+0gcKwABIZSmBaNIQCMU5QG4OqWGBgAD3C6v7ooA5dBQ9A4ZeaYBFWVBJ/8AAVAbRQfmAR+TwwGlQASIeiAXQ6oIBQueRgI3B1f3R6hAe6BC0BFaUpgnTTDgAK5OeQEmjleDAZ0L9QuQKDIqwsAgqDkExWjCwD0jw8BIVhUE4uQsPyABl6AtKjDgJCuRyBWFJFYWAolQAj1E4r0WAmkuQuQTD6FmIA1SGqAk4ch4CoCOAKWLwYCcLGkisBlhY1vksBEgxc8mDOQWNIOQZ4di8VPIMcPGuFfIMsPF4J5Bnhzy0wSAnBi8GAxsGNKAZ4MaWFgM7CxpYmgUgpgGfqM21Z6CoqJi4AOCQ5AGHIqRU8gmQ1YJAEh4fmKBGFjSwcgzwctOT5BlyeNZ5LkGeKxXJyAjkrGuFYDLP8PlpyJ5BlyfLTkcgzGL5HIMuS5bcjkGWE0sTYDOxNjbE3yDLE2tPURYCL8oaIoCNPIAKioACzgAKohgDhwADAAHAABwAADAAjAAjAAjAAiAA6VABNTTAFE0wDP2ypgEIAB//9k=')`,
                }}
            >
                <div className="mask d-flex align-items-center h-95 gradient-custom-3 ">
                    <div className="container h-100 mt-2">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">SignUp</h2>

                                        <form onSubmit={handleLogin}>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="idname"
                                                    required
                                                    className="form-control form-control-lg"
                                                    name="name"
                                                    value={logd.name}
                                                    onChange={setinput}
                                                />
                                                <label className="form-label" htmlFor="idname">
                                                    Name
                                                </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="idemail"
                                                    required
                                                    className="form-control form-control-lg"
                                                    name="email"
                                                    value={logd.email}
                                                    onChange={setinput}
                                                />
                                                <label className="form-label" htmlFor="idemail">
                                                    Your Email
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="idpassword"
                                                    required
                                                    name="password"
                                                    className="form-control form-control-lg"
                                                    value={logd.password}
                                                    onChange={setinput}
                                                />
                                                <label className="form-label" htmlFor="idpassword">
                                                    Password
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="idcpassword"
                                                    required
                                                    name="confirmpassword"
                                                    className="form-control form-control-lg"
                                                    value={logd.confirmpassword}
                                                    onChange={setinput}
                                                />
                                                <label className="form-label" htmlFor="idcpassword">
                                                    Confirm Password
                                                </label>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input
                                                    className="idterm"
                                                    type="checkbox"
                                                    value=""
                                                    id="form2Example3cg"
                                                />
                                                <label className="form-check-label" htmlFor="idterm">
                                                    I agree all statements in{" "}
                                                    <a href="#!" className="text-body">
                                                        <u>Terms of service</u>
                                                    </a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    sign up
                                                </button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">
                                                Already have an account?{" "}

                                                <Link className="fw-bold text-body" to={`/signin?redirect=${redirect}`}>SigIn</Link>

                                            </p>
                                            {/* {auth.logStatus=="rejected"?<p style={{color:'red'}}>{auth.logError}</p>:null} */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignupForm