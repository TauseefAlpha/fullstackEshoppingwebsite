import React from 'react'

function Slider() {
    return (
        <>

            <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" style={{ position: "relative" }}>
                        <img src="./imgs/slider/slider7.jpg" className="d-block w-100" style={{ height: '80vh' }} alt="..." />
                        {/* <div className="carousel-caption d-none d-md-block float-left" style={{position:'absolute',left:'0px',top:"0px"}}> */}
                        <div className="p-1 m-1" style={{ position: 'absolute', left: '0px', top: "15rem", bottom: '0px' }}>
                            <div class="slider_content">
                                <h1>Nikon Point <br /> &amp; Shoot Cameras</h1>
                                <p>
                                    The Easy Way To Capture You Memories Cameras
                                </p>
                                <a className='btn btn-dark' href="shop.html">Shop Now </a>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="./imgs/slider/slider8.jpg" className="d-block w-100" style={{ height: '80vh', position: "relative" }} alt="..." />
                        {/* <div className="carousel-caption d-none d-md-block"> */}
                        <div className="p-1 m-1" style={{ position: 'absolute', left: '0px', top: "15rem", bottom: '0px' }}>
                            <div class="slider_content">
                                <h1>Bose Portable <br /> Home Speaker</h1>
                                <p>Our Most Versatile Smart Speaker Is A Wireless</p>
                                <a className='btn btn-outline-dark' href="shop.html">Shop Now </a>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="./imgs/slider/slider5.jpg" className="d-block w-100" style={{ height: '80vh', position: "relative" }} alt="..." />
                        <div className="p-1 m-1 text-dark" style={{ position: 'absolute', left: '0px', top: "15rem", bottom: '0px' }}>
                            {/* <div class="slider_content slider_c_three"> */}
                            <h1>Stylish Watch Women</h1><h2>Melinda Series</h2>
                            <p>
                                Now Available On All Local &amp; Online Stores
                            </p>
                            <a type="button" className='btn btn-light' href="shop.html">Shop Now </a>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Slider