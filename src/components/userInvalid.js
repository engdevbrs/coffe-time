import { Container, Alert } from "react-bootstrap";
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row';

const UserInvalid = () => {

    const [show, setShow] = useState(true);

    return (
      <>
        <Container>
            <Row className="mt-3">
                <Alert show={show} key='success' variant='danger' onClose={() => setShow(false)} dismissible>
                No tienes permisos para entrar a esta sección. Primero debes iniciar sesión con un rol de <strong>Administrador</strong> haciendo click{' '}
                <Alert.Link as={Link} to="/login">aquí</Alert.Link>. Una vez ingreses, podrás acceder con normalidad.
                </Alert>
            </Row>
        </Container>
      </>
    )
}

export default UserInvalid