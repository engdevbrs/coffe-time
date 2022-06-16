import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { Outlet, Link} from 'react-router-dom';
import coffe from '../images/coffee.png';

const Menu = () => {
    return (
      <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as={Link} to="/"><img src={ coffe } /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
          <Nav.Link as={Link} to="/" >Menu</Nav.Link>
          <Nav.Link as={Link} to="/" >Pricing</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <section>
        <Outlet></Outlet>
      </section>
    </>
    )
  }

export default Menu