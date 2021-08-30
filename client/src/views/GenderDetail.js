import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import {
    Card,
    Container,
    Row,
    Col,
} from "react-bootstrap";

// Api
import GeneroAPI from '../service/Genero';


function GenderDetail() {
    const { id } = useParams();
    const [genero, setGenero] = useState([]);


    useEffect(async () => {
        let { data } = await GeneroAPI.getOne(id)
        setGenero(data)
    }, [])

    return (
        <Container fluid>
            <Row style={{ justifyContent: 'center' }} >
                <Col md="6">
                    <Card >
                        <Card.Body >
                            <Row>
                                <Col style={{ textAlign: 'center' }}>
                                    <div style={{ marginTop: '15px' }}>
                                        <Card.Title as="h4">Genero: {genero.nome}</Card.Title>
                                        <Row style={{ marginLeft: '10px' }}>Id: {genero.id}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Nome: {genero.nome}</Row>
                              

                                   
                                    </div>
                                    <Link to={'/admin/tabela-generos'}>Voltar</Link>
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
}

export default GenderDetail;