import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import carrito from './images/cart.png';

const Cart = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="outline">
            <img src={ carrito }  width='48' onClick={handleShow}/>
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}

export default Cart