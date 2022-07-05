import React, { useState, useEffect } from 'react'
import { Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import './platos.css';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import getUsers from "../services/getUsers";
import './users.css';
import UserInvalid from './userInvalid';

const User = () => {

    const [ dataUser, setDataUser ] = useState([]);

    console.log(dataUser);

    const getData = async() =>{
        const newDataUser = await getUsers();
        setDataUser(newDataUser);
        }
    
    useEffect ( () => {
        getData();
    },[]);

    if(dataUser === null) {
        return <UserInvalid />
    }

    return(
        <>
        <Container className='titulo'>
        <h1>Usuarios registrados</h1>
        </Container>
        <Row className='registeredUsers m-4'>
        {
            dataUser.map(value => {
                console.log(value);
                return(
                    <>
                    <Col className='profile' lg={4} md={6} sm={6} xs={12} >
                    <Card className='profile-cards' text='white' style={{ width: '20rem'}} >
                        <Card.Img variant="top" src={value.img}/>
                        <Card.Body>
                            <Card.Title>{value.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush" >
                            <ListGroupItem><strong>Email: </strong>{value.email}</ListGroupItem>
                            <ListGroupItem><strong>Teléfono: </strong>{value.phone}</ListGroupItem>
                            <ListGroupItem><strong>Rol: </strong>{value.roles[0]}</ListGroupItem>
                        </ListGroup>
                    </Card>
                    </Col>
                    </>
                )
            })
        }
        </Row>
        </>
    )
}

export default User