import getOrders from "../services/getOrders";
import { Card, Container, Nav, Button, Alert, Form, InputGroup } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import './pedidos.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Pedidos = () => {

    const [ data, setData ] = useState([]);
    const [show, setShow] = useState(true);

    const getData = async() =>{
    const newData = await getOrders();
    setData(newData);
    }

    useEffect ( () => {
        getData();
    },[]);

  return(
      <>
        <Container className="frame" fluid>
        <Row className="pedidos-layout">
        <h3 className="titulo-header m-1 p-2">Pedidos</h3>
        <Col className="pedidos m-1 p-2">
                {
                    data.map(element => {
                       return(
                        <>
                            <h4>{element.id}</h4> 
                        </>
                       )    
                    })
                }
        </Col>
        <h3 className="titulo-header m-1 p-2">Crear pedido</h3>
        <Col className="ordenar m-1 p-2">
        <Form>
        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Mesa</Form.Label>
            <Form.Control type="number" placeholder="Seleccione la mesa del pedido" />
        </Form.Group>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridProd">
                <Form.Label>Producto</Form.Label>
                <Form.Select defaultValue="">
                    <option></option>
                    <option>...</option>
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control type="number" placeholder="Ingrese la cantidad" />
            </Form.Group>
        </Row>
        <div className="d-grid gap-2">
            <Button variant="primary" size="md">
                Agregar más productos
            </Button>
            <Button variant="secondary" size="md">
                Crear pedido
            </Button>
        </div>
        </Form>
        </Col>
        </Row>
      </Container>
      </>
  )
}
export default Pedidos