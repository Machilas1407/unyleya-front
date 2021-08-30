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

import FormPublishingCompany from '../components/Form/FormPublishingCompany';


// Api
import EditoraAPI from '../service/Editora';




function EditorasTable() {
    const [editoras, setEditoras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lgShow, setLgShow] = useState(false);
    const [lgAlert, setLgAlert] = useState(false);
    const [form, setForm] = useState({ nome: "" })
    const [editoraAux, setEditoraAux] = useState({})


    useEffect(async () => {
        let { data } = await EditoraAPI.getAll()
        setEditoras(data)
        console.log(editoras)
        setLoading(false)
    }, [])


    const enviar = (e, editoraId, editora) => {

        e.preventDefault();
        console.log(editoraId)
        console.log(editora)

        EditoraAPI.updateOne(editoraId, editora)
            .then((data) => {
                console.log(data)
                window.location.reload()
            })


    }

    const deletarGenero = (editora) => {
        console.log(editora)

        EditoraAPI.deleteOne(editora.id)
            .then((data) => {
                console.log(data.data.sucess)
                window.location.reload()
            })
            .catch((erro) => {
                setLgAlert(true)
            })
    }

    const openModal = (editora) => {
        setEditoraAux(editora)
        setLgShow(true)
    }




    return (
        <>
            {!loading &&
                <Container fluid>
                    <FormPublishingCompany />
                    <Alert show={lgAlert} variant="danger">
                        <Alert.Heading>Apagar editora !</Alert.Heading>
                        <p>
                            Atenção, essa editora contém livros cadastrados a sua rede
                            edite ou remova os livros antes de apagar a editora
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
                                Edição da Editora
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Nome da Editora</Form.Label>
                                    <Form.Control onChange={(e) => setEditoraAux({ ...editoraAux, nome: e.target.value })} value={editoraAux.nome} type="text" placeholder="Nome do Genero" />
                                    <Button onClick={(e) => enviar(e, editoraAux.id, editoraAux)}>Gravarl</Button>
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
                                            {editoras.map((editora) => (
                                                <tr key={editora.id}>
                                                    <td>{editora.id}</td>
                                                    <td>{editora.nome}</td>

                                                    <td>
                                                        <Button variant="danger" className="mr-2" size="sm" onClick={() => { deletarGenero(editora) }} type="button"> Apagar </Button>
                                                        <Button size="sm" onClick={() => openModal(editora)}>Editar</Button></td>
                                                    <td><Link to={`editoras/${editora.id}`}><i><BsFillEyeFill /></i></Link> </td>
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

export default EditorasTable;