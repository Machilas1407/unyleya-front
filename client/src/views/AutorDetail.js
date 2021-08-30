import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import {
    Card,
    Container,
    Row,
    Col,
} from "react-bootstrap";

// Api
import AutorAPI from '../service/Autor';


function AutorDetail() {
    const { id } = useParams();
    const [autor, setAutor] = useState([]);


    useEffect(async () => {
        let { data } = await AutorAPI.getOne(id)
        setAutor(data)
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
                                        <Card.Title as="h4">Autor: {autor.nome}</Card.Title>
                                        <Row style={{ marginLeft: '10px' }}>Id: {autor.id}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Nome: {autor.nome}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Data de Nascimento: {autor.data_nasc}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Nacionalidade: {autor.nacionalidade}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Sexo: {autor.sexo}</Row>

                                   
                                    </div>
                                    <Link to={'/admin/tabela-autores'}>Voltar</Link>
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
}

export default AutorDetail;