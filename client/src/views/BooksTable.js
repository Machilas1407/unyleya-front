import React, {
    useEffect,
    useState
} from "react";

import {
    Card,
    Container,
    Row,
    Col,
    Table,
    Button,
    Modal,
    Form
} from "react-bootstrap";
import {
    Link
} from "react-router-dom";
import {
    BsFillEyeFill
} from "react-icons/bs";

import FormBook from '../components/Form/FormBook';


// Api
import LivroAPI from '../service/Livro';
import AutorAPI from '../service/Autor';
import EditoraAPI from '../service/Editora';
import GeneroAPI from '../service/Genero';




function LivrosTable() {
    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [editoras, setEditoras] = useState([]);
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lgShow, setLgShow] = useState(false);
    const [livroAux, setLivroAux] = useState({})


    useEffect(async () => {
        let {
            data: autores
        } = await AutorAPI.getAll()
        let {
            data: generos
        } = await GeneroAPI.getAll()
        let {
            data: editoras
        } = await EditoraAPI.getAll()
        let {
            data
        } = await LivroAPI.getAll()
        setLivros(data)
        setAutores(autores)
        setGeneros(generos.data)
        setEditoras(editoras)
        console.log(livros)
        setLoading(false)
    }, [])


    const enviar = (e, livroId, livro) => {

        e.preventDefault();
        console.log(livroId)
        console.log(livro)

        LivroAPI.updateOne(livroId, livro)
            .then((data) => {
                console.log(data)
                window.location.reload()
            })


    }

    const deletarLivro = (livro,) => {
        console.log(livro)

        LivroAPI.deleteOne(livro)
            .then((data) => {
                console.log(data.data.sucess)
                window.location.reload()
            })
        // let data = livros.filter((item) => {
        //     return (item.id !== livro.id)

        // })
        // setLivros(data)
    }

    const openModal = (livro) => {
        setLivroAux(livro)
        setLgShow(true)
        console.log(livroAux)
    }


    return (<>
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
                            Edição de Genero
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nome do Livro</Form.Label>
                                <Form.Control onChange={(e) => setLivroAux({ ...livroAux, titulo: e.target.value })} value={livroAux.titulo} type="text" placeholder="Nome do Genero" />

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Selecione o Autor</Form.Label>
                                <Form.Control onChange={(e) => setLivroAux({ ...livroAux, autor_id: e.target.value })} value={livroAux.autor_id} name="autor" as="select" custom>
                                    {autores.map((autor) => (
                                        <option key={autor.id} value={autor.id}>{autor.nome}</option>
                                    ))}

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Selecione o Genero</Form.Label>
                                <Form.Control onChange={(e) => setLivroAux({ ...livroAux, genero_id: e.target.value })} value={livroAux.genero_id} name="genero" as="select" custom>
                                    {generos.map((genero) => (
                                        <option value={genero.id}>{genero.nome}</option>
                                    ))}

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Selecione a Editora</Form.Label>
                                <Form.Control onChange={(e) => setLivroAux({ ...livroAux, editora_id: e.target.value })} value={livroAux.editora_id} name="editora" as="select" custom>
                                    {editoras.map((editora) => (
                                        <option value={editora.id}>{editora.nome}</option>
                                    ))}

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Lançamento</Form.Label>
                                <Form.Control onChange={(e) => setLivroAux({ ...livroAux, ano_lancamento: e.target.value })} value={livroAux.ano_lancamento} name="lancamento" placeholder="Nacionalidade" />
                            </Form.Group>
                        </Form>
                        <Button onClick={(e) => enviar(e, livroAux.id, livroAux)}>Gravar</Button>
                    </Modal.Body>
                </Modal>
                <FormBook />
                <Row className="mt-12">
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">ID</th>
                                            <th className="border-0">Titulo</th>
                                            <th className="border-0">Genero</th>
                                            <th className="border-0">Editora</th>
                                            <th className="border-0">Autor</th>
                                            <th className="border-0">Lançamento</th>
                                            <th className="border-0">Ações</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {livros.map((livro) => (
                                            <tr key={livro.id}>
                                                <td>{livro.id}</td>
                                                <td>{livro.titulo}</td>
                                                <td>{livro.genero.nome}</td>
                                                <td>{livro.editora.nome}</td>
                                                <td>{livro.autor.nome}</td>
                                                <td>{livro.ano_lancamento}</td>



                                                <td>

                                                    <Button variant="danger" className="mr-2" size="sm" onClick={() => { deletarLivro(livro.id) }} type="button"> Apagar </Button>
                                                    <Button size="sm" onClick={() => openModal(livro)}>Editar</Button>
                                                </td>
                                                <td>
                                                    <Link to={`livros/${livro.id}`}><i><BsFillEyeFill /></i></Link>
                                                </td>
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

export default LivrosTable;