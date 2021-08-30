import React, { useEffect, useState } from "react";

import {
    Card,
    Container,
    Row,
    Col,
    Table,
    Button,
    Modal,
    Form,
    Alert
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";

import FormGender from '../components/Form/FormGender';


// Api
import GeneroAPI from '../service/Genero';




function GenerosTable() {
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lgShow, setLgShow] = useState(false);
    const [lgAlert, setLgAlert] = useState(false);
    const [form, setForm] = useState({ nome: "" })
    const [generoAux, setGeneroAux] = useState({})


    useEffect(async () => {
        let { data } = await GeneroAPI.getAll()
        setGeneros(data.data)
        console.log(generos)
        setLoading(false)
    }, [])


    const enviar = (e, generoId, genero) => {

        e.preventDefault();
        console.log(generoId)
        console.log(genero)

        GeneroAPI.updateOne(generoId, genero)
            .then((data) => {
                console.log(data)
                window.location.reload()
            })


    }

    const deletarGenero = (genero, index) => {
        console.log(genero, index)

        GeneroAPI.deleteOne(genero.id)
            .then((data) => {
                console.log(data.data.sucess)
                window.location.reload()
            })
            .catch((erro) => {
                setLgAlert(true)
            })
        // let data = generos.filter((item) => {
        //     return (item.id !== genero.id)

        // })
        // setGeneros(data)
    }

    const openModal = (genero) => {
        setGeneroAux(genero)
        setLgShow(true)
        console.log(generoAux)
    }


    return (
        <>
            {!loading &&
                <Container fluid>
                    <FormGender />
                    <Alert show={lgAlert} variant="danger">
                        <Alert.Heading>Apagar genero!</Alert.Heading>
                        <p>
                            Atenção, esse genero contém livros cadastrados a sua rede
                            edite ou remova os livros antes de apagar o genero
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setLgAlert(false)} variant="outline-success">
                                Entendido!
                            </Button>
                        </div>
                    </Alert>
                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Edição de Genero
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Nome do Genero</Form.Label>
                                    <Form.Control onChange={(e) => setGeneroAux({ ...generoAux, nome: e.target.value })} value={generoAux.nome} type="text" placeholder="Nome do Genero" />
                                    <Button onClick={(e) => enviar(e, generoAux.id, generoAux)}>Enviar</Button>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <Row className="mt-12">
                        <Col md="12">
                            <Card className="strpied-tabled-with-hover">
                                <Card.Body className="table-full-width table-responsive px-0">
                                    <Table className="table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th className="border-0">ID</th>
                                                <th className="border-0">Nome</th>
                                                <th className="border-0">Ações</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {generos.map((genero) => (
                                                <tr key={genero.id}>
                                                    <td>{genero.id}</td>
                                                    <td>{genero.nome}</td>

                                                    <td>
                                                        <Button variant="danger" className="mr-2" size="sm" onClick={() => { deletarGenero(genero) }} type="button"> Apagar </Button>
                                                        <Button size="sm" onClick={() => openModal(genero)}>Editar</Button></td>
                                                    <td><Link to={`generos/${genero.id}`}><i><BsFillEyeFill /></i></Link> </td>
                                                </tr>

                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container >
            }
        </>

    )
}

export default GenerosTable;