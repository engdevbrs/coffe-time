import React from 'react';
import { Navbar, Nav, Container, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { Outlet, Link, useNavigate} from 'react-router-dom';
import coffe from '../images/coffee.png';
import logout from '../images/logout.png';
import Footer from './footer';
import './navbar.css';


const Menu = () => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Cerrar sesión
    </Tooltip>
  );

  const navigate = useNavigate();
  const userLogin = sessionStorage.getItem("tokenUser");
  const handleLogout = () => {
    if(userLogin !== undefined){
      sessionStorage.removeItem("tokenUser");
      navigate('/');
    }
  }
  return (
      <>
      <Navbar variant="dark">
        <Container className='navitems'>
        <Navbar.Brand as={Link} to="/"><img src={ coffe } /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
          <Nav.Link as={Link} to="/cartera" >Menú</Nav.Link>
          <Nav.Link as={Link} to="/pedidos" >Pedidos</Nav.Link>
          <Nav.Link as={Link} to="/usuarios" >Usuarios</Nav.Link>
        </Nav>
        </Container>
        <Container className='logout'>
        <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
          <Button variant="outline">
            <img className='logout-button' src={ logout } alt="logout" onClick={handleLogout}/>
          </Button>
        </OverlayTrigger>
        </Container>
      </Navbar>
      <section>
        <Outlet></Outlet>
      </section>
      <Footer />
    </>
    )
  }

export default Menu