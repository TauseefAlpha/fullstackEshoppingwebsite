import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Checkingoutstep(props) {
    return (
        <div><Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Sign-In step 1</Col>
            <Col className={props.step2 ? 'active' : ''}>Shipping step 2</Col>
            <Col className={props.step3 ? 'active' : ''}>Payment step 3</Col>
            <Col className={props.step4 ? 'active' : ''}>PlaceOrder step 4</Col>
        </Row></div>
    )
}

export default Checkingoutstep