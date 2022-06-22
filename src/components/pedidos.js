import getOrders from "../services/getOrders";
import { Card, Container, Nav, Button, Alert, Form, InputGroup } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import './pedidos.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Mesero from "./mesero";
import './mesero.css';
import getUsers from "../services/getUsers";


const Pedidos = () => {

    const [ data, setData ] = useState([]);
    const [ dataUser, setDataUser ] = useState([]);
    const [prodInput, setprodInput] = useState(1);
    const platillos = localStorage.getItem("platos");
    let listOrders = [];
    let precioTotal = 0;

    const handleAdd = (e) =>{
        e.preventDefault();
        setprodInput(prodInput+1)
    }

    const handleDelete = (e) =>{
        e.preventDefault();
        if(prodInput >= 2){
            setprodInput(prodInput-1);
        }
    }

    const getData = async() =>{
    const newData = await getOrders();
    setData(newData);
    const newDataUser = await getUsers();
    setDataUser(newDataUser);
    }

    useEffect ( () => {
        getData();
    },[]);

    console.log(dataUser);
    
    data.map(values => {
      const arrayOrders = values.order;
      const filteredList =  new Array();
      arrayOrders.forEach(elements =>{
        JSON.parse(platillos).map((element,key) => {
            let arrayPlatos = element[1];
            arrayPlatos.map(result => {
                if(elements.product === result.id){
                    const pedidoObject = {
                        cantidad: elements.quantity,
                        pedido: elements.product,
                        nombre: result.name,
                        imagen: result.img,
                        precio: result.price
                    }
                    filteredList.push(pedidoObject);
                }
            })
        })
      })
      const ordersObject = {
        horaOrden: values.created_at,
        idMesa: values.id,
        mesa: values.table,
        mesero: values.waiter,
        orden: filteredList
      }
      listOrders.push(ordersObject);
    })
    
  return(
      <>
        <Container className="frame" fluid>
        <Row className="pedidos-layout mt-4">
        <h3 className="titulo-header m-1 p-2">Pedidos</h3>
        <Col className="pedidos m-1 p-2">
                {
                    listOrders.map(element => {
                        const orders = element.orden;
                       return(
                        <>
                            <h4 className="idPedido">Mesero: {element.mesero}</h4>
                            <h6 className="idPedido">ID Mesa: {element.idMesa}</h6>
                            <h6 className="idPedido">Hora de orden: {element.horaOrden}</h6>
                            <h6 className="idPedido">Número de mesa: {element.mesa}</h6>
                            <Row>
                            {
                                orders.map((orderValue,key) =>{
                                    precioTotal = precioTotal + parseInt(orderValue.precio,10); 
                                    return(
                                        <>
                                        <Col className='platos m-2'>
                                            <Card className='platos-cards' text='white' style={{ width: '15rem'}} key={key}>
                                            <Card.Img variant="top" src={ orderValue.imagen }/>
                                            <Card.Body>
                                            <Card.Title><strong>Nombre: </strong> { orderValue.nombre }</Card.Title>
                                                <Card.Text>
                                                <strong>Cantidad: </strong>{ orderValue.cantidad }
                                                </Card.Text>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                        </>
                                    )
                                })
                            }
                            </Row>
                            <h4 className="idPedido">Total: { precioTotal }</h4>
                            <hr className="divider mt-3 mb-3"/>
                        </>
                       )    
                    })
                }
        </Col>
        </Row>
        <Row className="crearpedidos-layout mt-4 mb-4">
        <h3 className="titulo-header m-1 p-2">Crear pedido</h3>
        <Col className="ordenar m-1 p-2">
        <Form className="formulario">
        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Mesa</Form.Label>
            <Form.Control type="number" placeholder="Seleccione la mesa del pedido" />
        </Form.Group>  
            {
                Array.from({length: prodInput},(_,key) =>{
                    return(
                        <>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridProd">
                            <Form.Label>Producto</Form.Label>
                            <Form.Select defaultValue="1">
                                {
                                    JSON.parse(platillos).map(element => {
                                        let arrayPlatos = element[1];
                                        return(
                                            <>
                                                {
                                                    arrayPlatos.map(value => {
                                                        return(
                                                            <>
                                                            <option value={value.id}>{value.name}</option>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" placeholder="Ingrese la cantidad" />
                        </Form.Group>
                        </Row>
                        </>
                    )
                })
            }
        <div className="d-grid gap-2">
            <Row className="mb-3">
            <Form.Group as={Col} className="addProd" controlId="formGridPassword">
                <Button variant="primary" size="md" onClick={(e) => handleAdd(e)}>
                    Agregar producto
                </Button>
            </Form.Group>
            <Form.Group as={Col} className="delProd" controlId="formGridPassword">
                <Button variant="danger" size="md" onClick={(e) => handleDelete(e)}>
                    Eliminar producto
                </Button>
            </Form.Group>
            </Row>
            <Button variant="secondary" size="md">
                Crear pedido
            </Button>
        </div>
        </Form>
        </Col>
        </Row>
      </Container>
      <Container>
          <Row className='mesero-info'>
            <Col className="mb-2">
              <Mesero/>
            </Col>
          </Row>
        </Container>
      </>
  )
}
export default Pedidos