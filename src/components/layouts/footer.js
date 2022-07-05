import React, { Component } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Col, Container, Row } from 'react-bootstrap'
import './footer.css'

 const Footer = () => {
    return (
        <>
        <Container fluid>
        <Row className="footer-dark">
            <footer>
                <Container>
                    <Col className="col-md-6 item text">
                        <h3>coffe-time.com</h3>
                        <p>Para toda persona, un buen café.</p>
                    </Col>
                    <Col className="col-md-6 item social">
                        <a href="https://github.com/engdevbrs" target="_blank" ><i class="bi bi-github"></i></a>
                        <a href="https://www.linkedin.com/in/boris-rioseco-elgueta-60555b20b/" target="_blank"><i class="bi bi-linkedin"></i></a>
                        <a href="https://www.facebook.com/boris.francisco.1" target="_blank" ><i class="bi bi-facebook"></i></a>
                        <a href="https://www.instagram.com/boris.fre/?hl=es-la" target="_blank"><i class="bi bi-instagram"></i></a>
                    </Col>
                </Container>
                <p className="copyright">Desarrollado por <strong>engdevbrs</strong> &copy; 2022</p>
            </footer>
        </Row>
        </Container>
        </>
    )
}

export default Footer
