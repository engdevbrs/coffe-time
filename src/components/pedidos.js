import getOrders from "../services/getOrders";
import { Card, Container, Button, Form, Offcanvas } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import './pedidos.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './mesero.css';
import getUsers from "../services/getUsers";
import getTables from "../services/getMesas";
import camarero from './images/camarero.png';
import Swal from "sweetalert2";

async function newOrder(pedido) { 
    const getToken = localStorage.getItem('tokenUser');
    const accesToken = JSON.parse(getToken).access_token;
    return fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/orders', {
      method: 'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : `Bearer ${accesToken}`
      },
      body: JSON.stringify(pedido)
    })
      .then((data) => {
        if(data.status === 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Órden guardada con éxito.',
                showConfirmButton: false,
                timer: 1500
              });
        }else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'No se pudo guardar el envío.',
                showConfirmButton: false,
                timer: 1500
              });
        }
        return data.json();
      })
      .catch((error) => {
        console.log(error);
    })
   };

const Pedidos = () => {

    const [ data, setData ] = useState([]);
    const [ dataUser, setDataUser ] = useState([]);
    const [ dataTable, setDataTable ] = useState([]);
    const [prodInput, setprodInput] = useState(1);
    const [pedidoMesero, setPedidoMesero] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const platillos = localStorage.getItem("platos");
    let listOrders = [];
    let precioTotal = 0;

    const getData = async() =>{
        const newData = await getOrders();
        setData(newData);
        const newDataUser = await getUsers();
        setDataUser(newDataUser);
        const newDataTable = await getTables();
        setDataTable(newDataTable);
    }
    
    useEffect ( () => {
        getData();
    },[]);

    data.forEach(values => {
      const arrayOrders = values.order;
      const filteredList =  [];
      arrayOrders.forEach(elements =>{
        JSON.parse(platillos).forEach((element,key) => {
            let arrayPlatos = element[1];
            arrayPlatos.forEach(result => {
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
      
      let fechaOrden = new Date(values.created_at);
      let ordersObject = {
        horaOrden: fechaOrden.toLocaleTimeString(),
        idMesa: values.id,
        mesa: values.table,
        mesero: values.waiter,
        orden: filteredList
      }
      if(!dataUser.error){
        dataUser.forEach(result => {
            if(ordersObject.mesero === result.id){
                ordersObject.img = result.img;
                ordersObject.name = result.name;
            }
        })
    }
      listOrders.push(ordersObject);
    });

    const handleAdd = (e) => {
        e.preventDefault();
        setprodInput(prodInput+1);
    }

    const handleDelete = (e) =>{
        e.preventDefault();
        if(prodInput >= 2){
            Swal.fire({
                title: 'Estás seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, estoy seguro!',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    setprodInput(prodInput-1);
                    Swal.fire(
                        'Eliminado!',
                        'El producto fue eliminado!',
                        'success'
                    )
                }
              })
        }
    }

    const handleNewOrder = async e => {
        e.preventDefault();
        let listTakeOrder = [];
        let listaPedidos = document.getElementsByClassName('plato');
        let listaCantidad = document.getElementsByClassName('cantidad');
        let mesa = document.getElementsByClassName('mesa');
        for(let i =0; i < listaPedidos.length; i++){
            let takeOrder = {};
            takeOrder.product = parseInt(listaPedidos[i].value,10);
            takeOrder.quantity = listaCantidad[i].valueAsNumber;
            listTakeOrder.push(takeOrder);
        }
        let request = {
            id: 328,
            waiter: 2,
            table: parseInt(mesa[0].value,10),
            order: listTakeOrder
        }
        Swal.fire({
            title: 'Quieres confirmar la órden?',
            text: "No podrás revertir esta acción.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmo',
            cancelButtonText: 'Cancelar órden'
          }).then((result) => {
            if (result.isConfirmed) {
                setPedidoMesero(oldArray => [...oldArray,request]);
                newOrder(request);
            }
          });
    };

    pedidoMesero.map(cart => {
        let arrayCart = cart.order;
        arrayCart.map(response => {
            JSON.parse(platillos).forEach(element => {
                let arrayPlatos = element[1];
                arrayPlatos.forEach(result => {
                    if(response.product === result.id){
                        response.nombre = result.name;
                        response.img = result.img;
                        response.table = cart.table;
                        response.precio = result.price;
                    }
                })
            })
        })
    });
        
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
                            <Row className="info-mesero">
                            <Col>
                                <h4 className="idPedido mb-4">Información Mesero</h4>
                                <h6 className="idPedido">ID Mesero: {element.mesero}</h6>
                                <h6 className="idPedido">Pedido N°: {element.idMesa}</h6>
                                <h6 className="idPedido">Hora de orden: {element.horaOrden}</h6>
                                <h6 className="idPedido">Número de mesa: {element.mesa}</h6>
                            </Col>
                            <Col className="mesero">
                                <h5 className="idPedido">{ !dataUser.error ? 'Mesero: ' + element.name : ''}</h5>
                                { 
                                   !dataUser.error ? <img src={element.img} alt={'imagen ' + element.name} style={{ width: '12rem' }}/> : <></>
                                }
                            </Col>
                            </Row>
                            <hr className="divider mt-3 mb-3"/>
                            <Row>
                            <h4 className="idPedido mb-4">Platos</h4>
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
                            <h4 className="idPedido">Total: $ { precioTotal }</h4>
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
        <Form className="formulario" onSubmit={handleNewOrder}>
        <Form.Group className="mb-3" controlId="formGridMesa">
            <Form.Label>Mesa</Form.Label>
            <Form.Select className="mesa" defaultValue="1">
                {
                    dataTable.map(element => {
                        if(element.available === true){
                            return(
                                <>
                                    <option value={element.id}>{element.name}</option>
                                </>
                            )
                        }
                        return true;
                    })
                }
            </Form.Select>
        </Form.Group>  
            {
                Array.from({length: prodInput},(_,key) =>{
                    return(
                        <>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridProd" key={key}>
                            <Form.Label>Producto</Form.Label>
                            <Form.Select className="plato" defaultValue="1" >
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
                        <Form.Group as={Col} controlId="formGridCant">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control className="cantidad" type="number" placeholder="Ingrese la cantidad"/>
                        </Form.Group>
                        </Row>
                        </>
                    )
                })
            }
        <div className="d-grid gap-2">
            <Row className="mb-3">
            <Form.Group as={Col} className="addProd" controlId="formGridAdd">
                <Button variant="primary" size="md" onClick={(e) => handleAdd(e)}>
                    Agregar producto
                </Button>
            </Form.Group>
            <Form.Group as={Col} className="delProd" controlId="formGridDel">
                <Button variant="danger" size="md" onClick={(e) => handleDelete(e)}>
                    Eliminar producto
                </Button>
            </Form.Group>
            </Row>
            <Button type="submit" variant="secondary" size="md">
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
                <Button variant="outline">
                <img src={ camarero }  width='48' onClick={handleShow}/>
                </Button>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Órdenes</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    {
                        pedidoMesero.map(cartOrder =>{
                            let totalCart = 0;
                            let carrito = cartOrder.order;
                            return(
                                <>
                                {
                                    carrito.map(value => {
                                    totalCart = totalCart + (value.quantity * parseInt(value.precio,10));
                                    return(
                                        <>
                                            <Row className="mt-2">
                                            <h6>Plato: {value.nombre}</h6>
                                            <h6>Cantidad: {value.quantity}</h6>
                                            <h6>Order para mesa: {value.table}</h6>
                                            <h6>Precio: ${value.precio} c/u</h6>
                                            <img src={value.img} style={{ width: '13rem'}} alt="Error al obtener imagen"/>
                                            </Row>
                                        </>
                                    )
                                    })
                                }
                                <h5 className="idPedido mt-2">Total: ${totalCart}</h5>
                                <hr className="divider mt-3 mb-3"/>
                                </>
                            )
                        })            
                    }
                    </Offcanvas.Body>
                </Offcanvas>
            </Col>
          </Row>
        </Container>
      </>
  )
}
export default Pedidos