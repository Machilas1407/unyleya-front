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

import FormAutor from '../components/Form/FormAutor';


// Api
import AutorAPI from '../service/Autor';




function AutoresTable() {
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lgShow, setLgShow] = useState(false);
    const [lgAlert, setLgAlert] = useState(false);
    const [autorAux, setAutorAux] = useState({})


    useEffect(async () => {
        let { data } = await AutorAPI.getAll()
        setAutores(data)
        console.log(autores)
        setLoading(false)
    }, [])


    const enviar = (e, autorId, autor) => {

        e.preventDefault();
        console.log(autorId)
        console.log(autor)

        AutorAPI.updateOne(autorId, autor)
            .then((data) => {
                console.log(data)
                window.location.reload()
            })


    }

    const deletarGenero = (autor, index) => {
        console.log(autor, index)

        AutorAPI.deleteOne(autor.id)
            .then((data) => {
                console.log(data.data.sucess)
                window.location.reload()
            })
            .catch((erro) => {
                setLgAlert(true)
            })
        // let data = autores.filter((item) => {
        //     return (item.id !== autor.id)

        // })
        // setAutores(data)
    }

    const openModal = (autor) => {
        setAutorAux(autor)
        setLgShow(true)
        console.log(autorAux)
    }


    return (
        <>
            {!loading &&
                <Container fluid>

                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"

                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Edição de Autor
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Nome do Autor</Form.Label>
                                    <Form.Control onChange={(e) => setAutorAux({ ...autorAux, nome: e.target.value })} value={autorAux.nome} type="text" placeholder="Nome do Genero" />

                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ano de Nascimento</Form.Label>
                                    <Form.Control onChange={(e) => setAutorAux({ ...autorAux, data_nasc: e.target.value })} value={autorAux.data_nasc} name="titulo" placeholder="Data de Nascimento" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sexo do Editor</Form.Label>
                                    <Form.Control onChange={(e) => setAutorAux({ ...autorAux, sexo: e.target.value })} value={autorAux.sexo} as="select" custom>

                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outros">Outros</option>

                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Nacionalidade</Form.Label>
                                    <Form.Control onChange={(e) => setAutorAux({ ...autorAux, nacionalidade: e.target.value })} value={autorAux.nacionalidade} name="lancamento" placeholder="Nacionalidade" />
                                </Form.Group>
                            </Form>
                            <Button onClick={(e) => enviar(e, autorAux.id, autorAux)}>Enviar</Button>
                        </Modal.Body>
                    </Modal>
                    <FormAutor />
                    <Alert show={lgAlert} variant="danger">
                        <Alert.Heading>Apagar Autor!</Alert.Heading>
                        <p>
                            Atenção, esse autor contém livros cadastrados a sua rede
                            edite ou remova os livros antes de apagar a editora
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setLgAlert(false)} variant="outline-success">
                                Entendido!
                            </Button>
                        </div>
                    </Alert>
                    <Row className="mt-12">
                        <Col md="12">
                            <Card className="strpied-tabled-with-hover">
                                <Card.Body className="table-full-width table-responsive px-0">
                                    <Table className="table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th className="border-0">ID</th>
                                                <th className="border-0">Nome</th>
                                                <th className="border-0">Ano de Nascimento</th>
                                                <th className="border-0">Sexo</th>
                                                <th className="border-0">Nacionalidade</th>
                                                <th className="border-0">Ações</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {autores.map((autor) => (
                                                <tr key={autor.id}>
                                                    <td>{autor.id}</td>
                                                    <td>{autor.nome}</td>
                                                    <td>{autor.data_nasc}</td>
                                                    <td>{autor.sexo}</td>
                                                    <td>{autor.nacionalidade}</td>




                                                    <td>
                                                        <Button variant="danger" className="mr-2" size="sm" onClick={() => { deletarGenero(autor) }} type="button"> Apagar </Button>
                                                        <Button size="sm" onClick={() => openModal(autor)}>Editar</Button></td>
                                                    <td><Link to={`autores/${autor.id}`}><i><BsFillEyeFill /></i></Link> </td>
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

export default AutoresTable;