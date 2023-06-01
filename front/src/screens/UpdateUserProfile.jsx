import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { wholeshop } from "../store/StoreContex"
import { toast } from "react-toastify"
// import { getError } from '../utilis';



const reducer = (state, action) => {
    switch (action.type) {

        case 'updateuser':
            return { ...state, loading: true };
        case "updatesuccessful":
            return { ...state, loading: false };
        case 'updatefail':
            return { ...state, loading: false };

        default:
            return state;
    }

}




function UpdateUserProfile() {

    const { state, dispatch: ctxDispatch } = useContext(wholeshop);
    const { userdetail } = state
    const [updatedata, setUpdatedata] = useState(userdetail)
    const [confirmpassword, setconfirmpassword] = useState('')
    const [password, setPassword] = useState('');

    //usereducer
    const [{ loading }, dispatch] = useReducer(reducer, { loading: false })


    const setinput = (event) => {
        const { name, value } = event.target;

        setUpdatedata({
            ...updatedata,
            [name]: value,
        });
    };


    const handleprofile = async (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {

            console.log("tokrn", `Alphat ${userdetail.token}`)
            dispatch({ type: "updateuser" })
            const { data } = await axios.put("http://localhost:5040/user/auth/updateapi", {
                name: updatedata.name,
                email: updatedata.email,
                password: password

            }, {

                headers: { authorization: `Alphat ${userdetail.token}` },
            })
            dispatch({ type: "updatesuccessful" })
            ctxDispatch({ type: 'userLogin', payload: data });
            localStorage.setItem("userdetail", JSON.stringify(data))
            toast.success('User updated successfully');

        } catch (error) {
            dispatch({ type: "updatefail" })
            // toast.error(getError(error))
        }

    }

    return (
        <div>

            <Helmet>
                <title>Update Profile</title>
            </Helmet>
            <div>

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
                                            <h2 className="text-uppercase text-center mb-5">Profile Update</h2>

                                            <form onSubmit={handleprofile}>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        id="idname"
                                                        required
                                                        className="form-control form-control-lg"
                                                        name="name"
                                                        value={updatedata.name}
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
                                                        value={updatedata.email}
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
                                                        onChange={(e) => setPassword(e.target.value)}
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
                                                        onChange={(e) => setconfirmpassword(e.target.value)}
                                                    />
                                                    <label className="form-label" htmlFor="idcpassword">
                                                        Confirm Password
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
                                                    >
                                                        Update Profile
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default UpdateUserProfile