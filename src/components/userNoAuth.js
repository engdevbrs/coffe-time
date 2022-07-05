import { Container, Alert } from "react-bootstrap";
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row';

const UserNoAuth = () => {

    const [show, setShow] = useState(true);

    return (
      <>
        <Container>
            <Row className="mt-3">
                <Alert show={show} key='success' variant='danger' onClose={() => setShow(false)} dismissible>
                Para ingresar a la sección de pedidos, debes iniciar sesión con tu <strong>Usuario</strong> haciendo click{' '}
                <Alert.Link as={Link} to="/login">aquí</Alert.Link>. Luego de ingresar tus credenciales, serás redirigido a la sección de órdenes.
                </Alert>
            </Row>
        </Container>
      </>
    )
}

export default UserNoAuth