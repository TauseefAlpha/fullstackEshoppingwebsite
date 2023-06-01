import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet-async"
import { useContext } from 'react'
import { wholeshop } from '../store/StoreContex'
import { useNavigate } from 'react-router-dom'
import Checkingoutstep from '../components/Checkingoutstep'



function HandleShipping() {
    const { state, dispatch } = useContext(wholeshop)
    const { cart: { shippaddres } } = state
    const { userdetail } = state
    const navigate = useNavigate()

    const [getShippingData, setShippingData] = useState({
        name: `${shippaddres.name || ""}`,
        address: `${shippaddres.address || ""}`,
        city: `${shippaddres.city || ""}`,
        zipcode: `${shippaddres.zipcode || ""}`,
        country: `${shippaddres.country || ""}`

    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setShippingData({
            ...getShippingData,
            [name]: value
        }
        )
        // console.log("your shipping value from state", getShippingData)
    }
    const handleShippAdress = (e) => {
        e.preventDefault()
        console.log("your ARE SUBMITING THAT state", getShippingData)
        dispatch({ type: "saveshippaddres", payload: getShippingData })
        localStorage.setItem("saveshippaddres", JSON.stringify(getShippingData))
        navigate('/paymenthandle')

    }

    console.log("shippaddres you want to enter in field", shippaddres)
    useEffect(() => {
        if (!userdetail) {
            navigate(`/signin?redirect=shipping`)
        }
    }, [userdetail, navigate])

    return (
        <div className='container'>
            <Helmet>
                <title>Shipping Form</title>
            </Helmet>
            <Checkingoutstep step1 step2></Checkingoutstep>
            <div className="row justify-content-center">
                <div className="col-md-6 mb-4 mt-2">
                    <div className="card mb-4">
                        <div className="card-header py-3 bg-secondary">
                            <h5 className="mb-0 text-font text-uppercase text-white">Shipping address</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleShippAdress}>

                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <input type="text" id="nameid" className="form-control"
                                                required
                                                name='name'
                                                value={getShippingData.name}
                                                onChange={handleChange}
                                            />
                                            <label className="form-label" htmlFor="nameid">First name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="addressid" className="form-control"
                                        required
                                        name='address'
                                        value={getShippingData.address}
                                        onChange={handleChange}
                                    />
                                    <label className="form-label" htmlFor="addressid">Address</label>
                                </div>


                                <div className="form-outline mb-4">
                                    <input type="text" id="cityid" className="form-control"
                                        required
                                        name='city'
                                        value={getShippingData.city}
                                        onChange={handleChange}

                                    />
                                    <label className="form-label" htmlFor="cityid">City</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="zipcodeid" className="form-control"
                                        required
                                        name='zipcode'
                                        value={getShippingData.zipcode}
                                        onChange={handleChange}

                                    />
                                    <label className="form-label" htmlFor="zipcodeid">zipcode</label>
                                </div>


                                <div className="form-outline mb-4">
                                    <input type="text" id="countryid" className="form-control"
                                        required
                                        name='country'
                                        value={getShippingData.country}
                                        onChange={handleChange} />
                                    <label className="form-label" htmlFor="countryid">Country</label>
                                </div>


                                <div className="form-check d-flex justify-content-center mb-2">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="createaccountid" checked />
                                    <label className="form-check-label" htmlFor='createaccountid'>
                                        Create an account?
                                    </label>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-success col-md-4">Place order</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>






        </div>

    )
}

export default HandleShipping