import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import './platos.css';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Platos = ({data}) => {

    const [showMore, setShowMore] = useState(false);
    const numberOfItems = showMore ? data.length : 3
    return (
        <Row className='m-3'>
        {data
        .slice(0, numberOfItems)
        .map((subValue, key) => {
            return(
                <>
                <Col className='platos'>
                    <Card className='platos-cards' text='white' style={{ width: '20rem'}} key={key}>
                    <Card.Img variant="top" src={ subValue.img }/>
                    <Card.Body>
                    <Card.Title><strong>Plato: </strong> { subValue.name }</Card.Title>
                        <Card.Text>
                        <strong>Ingredientes: </strong>{ subValue.description }
                        </Card.Text>
                        <Card.Text>
                        <strong>Precio:</strong> ${ subValue.price }
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
                </>
            )
            })
        }
        <Container className="view-more mt-3 mb-3">
            <Button variant="primary" size="sm" onClick={() => setShowMore(!showMore)}>Ver {showMore === true ? 'menos' : 'más'}</Button>
        </Container>
        </Row>
    )
}

export default Platos