import React from 'react'
import { Link } from "react-router-dom"


const st = {
    borderTop: '6px solid white',
    borderBottom: '5px solid white',
    backgroundColor: 'grey',
    boxShadow: '5px 10px 18px #2f2f35'
}
function Footer() {


    return (
        <>

            <div>
                <footer id="contact">
                    <div className="container-fluid " style={{ backgroundColor: 'grey' }} >
                        <div className="container">
                            <div className="row mx-4 py-3 justify-content-around" style={st}>
                                <div className="col-md-3 ">
                                    <h4 className="text-white text-center">Disclaimer</h4>
                                    <p className="text-light">ECommerce Websites will not be responsible for any damages your business may suffer to the extent permissable by law.
                                        We make no warranties of any kind, express, implied, statutory or otherwise for any Service we provide.
                                    </p>
                                    <p className="text-light"> link is provided if you want to wish to buy from coyright
                                        owner <span style={{ color: 'black' }}>ahmedtause98@gmail.com</span> laptop
                                        images are provided
                                    </p>

                                </div>


                                <div className="col-md-3">
                                    <h4 className="text-white text-center">Contact Details</h4>
                                    <ul style={{ listStyleType: 'none' }}>
                                        <li className=" text-white nav-item "><a className="nav-link text-white" href="/"><i
                                            className="fa-solid fa-house pe-2 " style={{ fontSize: '20px', color: 'white' }}></i>TelePHone :03145976605</a></li>
                                        <li className="text-white nav-item"><a className="nav-link text-white" href="/"> <i className="fa fa-google-plus" style={{ fontSize: '20px', color: 'white', marginRight: '8px' }}></i>Email : <span
                                            style={{ color: 'white' }}>
                                            abc@gmail.com</span></a></li>
                                        <li className=" text-white  nav-item"><a className="nav-link text-white" href="/">
                                            {/* <span style={{ color: 'rgb(3, 52, 69)' }}> <LanguageRoundedIcon /></span> */}

                                            Website: <span
                                                style={{ color: 'black' }}>
                                                www.abc.com</span></a></li>
                                    </ul>
                                    <center style={{ color: 'white' }}><i class="fa fa-map-marker" style={{ fontSize: '20px', color: '#fff' }}></i>  </center>
                                    <ul className="text-white" style={{ listStyleType: 'none' }}>
                                        <li className="nav-item"> <a className="nav-link text-white" href="/"> MureeRoad</a>
                                        </li>
                                        <li className="nav-item"> <a className="nav-link text-white" href="/"> Sadder</a>
                                        </li>
                                        <li className="nav-item"> <a className="nav-link text-white" href="/">Rawalpindi</a>
                                        </li>
                                    </ul>

                                </div>


                                <div className="col-md-3">

                                    <h4 className="text-white text-center">Sample Menu</h4>
                                    <ul style={{ lineHeight: '300%', listStyleType: 'none' }} className="text-white">
                                        <li className=" nav-item text-white" style={{ borderBottom: '2px solid white', alignSelf: 'initial' }}> <a
                                            className="nav-link text-white" href="/">
                                            {/* <ChatIcon style={{color:'red'}}/> */}
                                            ODERLIKE TO DO</a> </li>
                                        <li className=" nav-item text-white" style={{ borderBottom: '2px solid white', alignSelf: 'initial' }}> <a
                                            className="nav-link text-white" href="/">
                                            {/* <SignalCellularAltIcon style={{ color: "rgb(3, 52, 69)" }} />  */}
                                            SIGNAL Tower</a>
                                        </li>
                                        <li className=" nav-item text-white" style={{ borderBottom: '2px solid white', alignSelf: 'initial' }}> <a
                                            className="nav-link text-white" href="/">
                                            {/* <EmojiFoodBeverageIcon style={{ color: 'rgb(3, 52, 69)' }} /> */}
                                            TEA BREAK</a> </li>
                                        <li className=" nav-item text-light" style={{ borderBottom: '2px solid white', alignSelf: 'initial' }}> <a
                                            className="nav-link text-white" href="/">
                                            {/* <MoodIcon style={{ color: 'rgb(3, 52, 69)' }} /> */}
                                            Mood funny</a>
                                        </li>
                                    </ul>
                                </div>





                            </div>

                        </div>

                        <div className="row  justify-content-between" style={{ backgroundColor: 'grey' }}>
                            <div className="col-md-4 p-2">
                                <ul className="" style={{ listStyleType: 'none' }}>
                                    <li style={{ display: 'inline-block', margin: '6px' }} className="nav-item "><Link className="nav-link text-light"
                                        to="/">
                                        sample link1</Link></li>
                                    <li style={{ display: 'inline-block', margin: '6px' }} className="nav-item "><Link className="nav-link text-light"
                                        to="/">
                                        sample link2</Link></li>
                                    <li style={{ display: 'inline-block', margin: '6px' }} className="nav-item "><Link className="nav-link  text-light"
                                        to="/">
                                        sample link3</Link></li>

                                </ul>

                            </div>
                            <div className="col-md-2 p-2 text-light text-center">

                                {/* <CopyrightIcon style={{color:'white'}}/> */}
                                coptwrightInfo TA
                            </div>
                        </div>
                    </div>

                </footer>


            </div>


        </>
    )
}

export default Footer