import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import {
    Card,
    Container,
    Row,
    Col,
} from "react-bootstrap";

// Api
import EditoraAPI from '../service/Editora';


function GenderDetail() {
    const { id } = useParams();
    const [editora, setEditora] = useState([]);


    useEffect(async () => {
        let { data } = await EditoraAPI.getOne(id)
        setEditora(data)
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
                                        <Card.Title as="h4">Editora: {editora.nome}</Card.Title>
                                        <Row style={{ marginLeft: '10px' }}>Id: {editora.id}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Nome: {editora.nome}</Row>
                              

                                   
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