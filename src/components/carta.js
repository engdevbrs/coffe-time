import getMenu from "../services/getCarta";
import { Card, Container, Nav, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import './carta.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cart from './carrito';
import Platos from "./platos";
import { Link } from 'react-router-dom';

const Carta = () => {

  const [ data, setData ] = useState([]);
  const [show, setShow] = useState(true);

  const getData = async() =>{
  const newData = await getMenu();
  setData(newData);
  }

  useEffect ( () => {
    getData();
  },[]);

  return(
      <>
      <Container>
        <Row className='cart'>
          <Col className="mb-2">
            <h6>1</h6>
            <Cart/>
          </Col>
        </Row>
      </Container>
      <Container>
      <Row  className='cabecera-init mt-5 mb-2'>
        <h2 className='benefits'>Carta</h2>
        <Row className="mt-3">
        <Alert show={show} key='success' variant='success' onClose={() => setShow(false)} dismissible>
          Si eres mesero y quieres tomar pedidos, primero debes iniciar sesión con tu usuario{' '}
          <Alert.Link as={Link} to="/login">aquí</Alert.Link>. Una vez ingreses, serás redirigido a la sección de pedidos.
        </Alert>
        </Row>
      </Row>
      </Container>
      <Container className='mt-5 mb-5'>
          <Row className='coffes-variants'>
            {
              data.map((allData, key) => {
                let info = allData[1];
                return(
                  <div key={key}>
                    <hr className="divider"/>
                      <h3 className="tipo m-2">{allData[0]}</h3>
                    <hr className="divider"/>
                    <Platos data={info}/>
                  </div>
                )
              })
              }
          </Row>
        </Container>
      </>
  )
}
export default Carta