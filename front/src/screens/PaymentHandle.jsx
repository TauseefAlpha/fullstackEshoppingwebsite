import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import Checkingoutstep from '../components/Checkingoutstep'
import { wholeshop } from "../store/StoreContex"

function PaymentHandle() {
    const navigate = useNavigate()

    const { state, dispatch } = useContext(wholeshop)
    const { cart: { paymentMethod, shippaddres } } = state

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod||"Strip");

    useEffect(() => {
        if (!shippaddres) {
            navigate('/shipping')
        }
    }, [shippaddres, navigate])

    const handleselectpayment = (e) => {
        e.preventDefault()
        dispatch({ type: "paymentMethodType", payload: paymentMethodName })
        localStorage.setItem("paymentMethodType",paymentMethodName)
        navigate('/oderplace')
    }
    console.log("you selected following payment method", paymentMethodName)

    return (
        <>
            <div className="container">
                <Helmet><title>Payment Method</title></Helmet>
                <Checkingoutstep step1 step2 step3 />
                <div className="row justify-content-center mt-2 ">
                    <div className="col-md-6 " style={{ width: '40rem', border: "4px solid grey" }}>
                        <div className='text-center'><h1>Payment Method </h1></div>
                        <form onSubmit={handleselectpayment}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Strip" id="Stripid" value="Stripe"
                                    checked={paymentMethodName === 'Stripe'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="Stripid">
                                    strip
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Paypal" id="Paypalid" value="PayPal"
                                    checked={paymentMethodName === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label className="form-check-label" htmlFor="Paypalid">
                                    Paypal
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="CashonDilevery" id="CashonDileveryid" value="CashonDilevery"
                                    checked={paymentMethodName === 'CashonDilevery'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="CashonDileveryid">
                                    Cash on Dilevery
                                </label>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-outline-secondary'>Continue next Step</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PaymentHandle