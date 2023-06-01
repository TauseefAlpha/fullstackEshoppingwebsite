
import React, { useEffect, useReducer, useState, } from 'react'
import Card from '../components/Card'
import axios from 'axios'
// import Productapi from '../components/Product'
import logger from "use-reducer-logger"
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Helmet } from 'react-helmet-async'
import Slider from '../components/Slider'
import BtnPagenation from '../components/BtnPagenation'
import Footer from '../components/Footer'



const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };

        case "FETCH_SUCCESS":
            return { ...state, loading: false, data: action.payload };

        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


function Home() {
    const [{ loading, error, data }, dispatch] = useReducer(logger(reducer), {
        data: [],
        loading: true,
        error: ''

    })


    const [currentPage, setcurrentPage] = useState(1)
    // ====================================================//
    const [query, setQuery] = useState('')
    console.log("query value", query)
    // ================pagnination=====================//
    const pageSize = 6;
    const pages = Math.ceil((data.length) / pageSize)
    //  console.log("pages for mobile Item", pages)
    const arrayD = data.slice(((currentPage - 1) * pageSize), (currentPage * pageSize))


    const searchsubmit = (e) => {
        console.log("hello value", query)

    };



    useEffect(() => {
        const getdata = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get('http://localhost:5040/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        };
        getdata();
    }, [])


    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Slider />
            <main>
                <div className="container my-2 ">
                    <div className="row justify-content-center">
                        <div className='text-center' style={{ fontFamily: "Trirong, serif", color: 'GrayText' }}> <h1>Shopping Store</h1>
                            <div className="row justify-content-center">
                                <div className='col-md-4 mb-2 '>
                                    <form className="d-flex me-2" onSubmit={searchsubmit}>
                                        <input
                                            className="form-control me-2"
                                            style={{ border: "2px solid black" }}
                                            type="text"
                                            placeholder="Searchproduct"
                                            onChange={(e) => setQuery(e.target.value)}
                                        ></input>
                                        <button className=" btn btn-secondary" type="submit">
                                            Search
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {
                            loading ? (
                                <div className='text-center'>
                                    <LoadingBox />
                                </div>
                            ) : error ? (<div className='text-center'><MessageBox /></div>) :
                                (arrayD.map((product, ind) => {
                                    return (
                                        <div className="col-md-4 col-sm-6" key={product.id}>
                                            <Card
                                                name={product.name}
                                                slug={product.slug}
                                                desc={product.desc}
                                                price={product.price}
                                                image={product.image}
                                                rating={product.rating}
                                                reviews={product.reviews}
                                                product={product}
                                            />
                                        </div>
                                    )
                                })
                                )
                        }


                    </div>
                    <div className='text-center'>
                        <BtnPagenation
                            currentPage={currentPage}
                            setCurrentPage={setcurrentPage}
                            pages={pages}
                        />
                    </div>
                </div>
                <Footer/>
            </main>


        </>
    )
}

export default Home