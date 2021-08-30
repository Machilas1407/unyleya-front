import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import {
    Card,
    Container,
    Row,
    Col,
} from "react-bootstrap";

// Api
import LivroAPI from '../service/Livro';


function LivroDetail() {
    const { id } = useParams();
    const [livro, setLivro] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(async () => {
        let { data } = await LivroAPI.getOne(id)
        console.log(data)
        setLivro(data)
        setLoading(false)
    }, [])

    return (
        <>
        {!loading &&
        <Container fluid>
            <Row style={{ justifyContent: 'center' }} >
                <Col md="6">
                    <Card >
                        <Card.Body >
                            <Row>
                                <Col style={{ textAlign: 'center' }}>
                                    <div style={{ marginTop: '15px' }}>
                                        <Card.Title as="h4">Livro: {livro.titulo}</Card.Title>
                                        <Row style={{ marginLeft: '10px' }}>Id: {livro.id}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Titulo: {livro.titulo}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Genero: {livro.genero.nome}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Autor: {livro.autor.nome}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Editora: {livro.editora.nome}</Row>
                                        <Row style={{ marginLeft: '10px' }}>Lançamento: {livro.ano_lancamento}</Row>

                                   
                                    </div>
                                    <Link to={'/admin/tabela-livros'}>Voltar</Link>
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
        }
        </>
    );
}

export default LivroDetail;