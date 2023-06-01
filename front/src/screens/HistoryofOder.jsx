
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from "react-helmet-async"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { wholeshop } from '../store/StoreContex';
import { getError } from '../utilis';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                orders: action.payload
            };
        case 'FETCH_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}


function HistoryofOder() {
    const { state } = useContext(wholeshop);
    const { userdetail } = state

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    const navigate = useNavigate()
    useEffect(() => {

        const fetchoderrecord = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const { data } = await axios.get("http://localhost:5040/user/oder/blongme", {

                    headers: { authorization: `Alphat ${userdetail.token}` },

                })
                dispatch({ type: 'FETCH_SUCCESS', payload: data })

            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }

        }

        fetchoderrecord();

    }, [userdetail])

    console.log("order,history", orders)


    return (
        <>
            <Helmet> <title>HistoryofOder</title></Helmet>
            <div className="container">
                <div className="row justify-content-center mt-2">
                    <h1 className='text-center' style={{ fontFamily: "Trirong, serif", color: 'GrayText' }}>Historyof Oders</h1>
                    <div className="col-md-10">
                        <table className='table table-hover'>
                            <thead className='table-dark '>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Totalprice</th>
                                    <th>IsPaid</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((itm, index) => (
                                    <tr key={index}>
                                        <td><div>{itm._id}</div></td>
                                        <td><div>{itm.createdAt.substring(0, 10)}</div></td>
                                        <td><div>{itm.totalPrice.toFixed(2)}</div></td>
                                        <td><div>{itm.isPaid ? itm.paidAt.substring(0, 10) : 'No'}</div></td>
                                        <td> <div>   <button
                                            className='btn btn-warning'
                                            type="button"
                                            color="light"
                                            onClick={() => {
                                                navigate(`/oder/${itm._id}`);
                                            }}
                                        >
                                            Details
                                        </button></div></td>
                                    </tr>

                                ))
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HistoryofOder