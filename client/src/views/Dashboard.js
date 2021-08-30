import React, { useEffect, useState } from "react";
import {
    Card,
    Container,
    Row,
    Col
} from "react-bootstrap";
import { Link } from "react-router-dom";


// Components
import BarChart from '../components/BarChart/BarChart';
import PieChart from '../components/PieChart/PieChart';

// Api
import AutorAPI from '../service/Autor';
import EditoraAPI from '../service/Editora';
import GeneroAPI from '../service/Genero';
import LivroAPI from '../service/Livro';


// Icons
import { GiBookshelf } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { BsBookHalf } from "react-icons/bs";
import { IoMdTransgender } from "react-icons/io";




function Dashboard() {
    const [livros, setLivros] = useState([]);
    const [editoras, setEditoras] = useState([]);
    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [graficoBarrasData, setGraficoBarrasData] = useState(null);
    const [graficoBarrasDataEditora, setGraficoBarrasDataEditora] = useState(null);
    const [graficoBarrasDataGenero, setGraficoBarrasDataGenero] = useState(null);
    const [changeDate, setChangeDate] = useState(false);

    useEffect(async () => {
        await getLivros()
        await getEditoras()
        await getAutores()
        await getGeneros()
        await getLivrosByAutor()
        await getLivrosByEditora()
        await getLivrosByGenero()

    }, [])

    const getLivros = async () => {
        const { data: LivrosData} = await LivroAPI.getAll()
        setLivros(LivrosData)
    }

    const getEditoras = async () => {
        const { data: EditorasData } = await EditoraAPI.getAll()
        setEditoras(EditorasData)
    }

    const getAutores = async () => {
        const { data: AutoresData } = await AutorAPI.getAll()
        setAutores(AutoresData)
    }

    const getGeneros = async () => {
        const { data: GenerosData } = await GeneroAPI.getAll()
        setGeneros(GenerosData.data)
    }


    const getLivrosByAutor = async () => {
        const { data } = await AutorAPI.getAutorChart()

        const labels = data.map(autor => {
            return autor.nome
        })
        const livroCountArray = data.map(autor => {
            return autor.livro_count
        })
        const newObj = { labels, datasets: [{ label: "Livros", data: livroCountArray, backgroundColor: '#9BCFF5' }] }

        setGraficoBarrasData(newObj)
    }
    const getLivrosByEditora = async () => {
        const { data } = await EditoraAPI.getEditoraChart()

        const labels = data.map(editora => {
            return editora.nome
        })
        const livroCountArray = data.map(editora => {
            return editora.livro_count
        })
        const newObj = { labels, datasets: [{ label: "Livros", data: livroCountArray, backgroundColor: '#A52A2A' }] }

        setGraficoBarrasDataEditora(newObj)
    }
    const getLivrosByGenero = async () => {
        const { data } = await GeneroAPI.getGeneroChart()

        const labels = data.map(genero => {
            return genero.nome
        })
        const livroCountArray = data.map(genero => {
            return genero.livro_count
        })
        const newObj = { labels, datasets: [{ label: "Livros", data: livroCountArray, backgroundColor: ['#A52A2A','#A51ada','#9BCFF5','#D2691E','#2F4F4F',] }] }

        setGraficoBarrasDataGenero(newObj)
    }


    // Chart Action
    // const changeData = async () => {
    //     setChangeDate(!changeDate)
    //     console.log(changeDate)
    //     changeDate ? await getAutorChart() : await getAutorChart(50, 25)
    // }

    return (
        <Container fluid>
            <Row>
                <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <Link to="tabela-livros">
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <BsBookHalf />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Livros</p>
                                            <Card.Title as="h4">{livros.length}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>              <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <Link to="customer-table">
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <GiBookshelf />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Editoras</p>
                                            <Card.Title as="h4">{editoras.length}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>              <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <Link to="tabela-autores">
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <FaUsers />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Autores</p>
                                            <Card.Title as="h4">{autores.length}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <Link to="quantity-customer-by-cities">
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <IoMdTransgender />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Generos</p>
                                            <Card.Title as="h4">{generos.length}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            <Row>
                <Col lg="6" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <BarChart data={graficoBarrasData} title="Quantidade de Livros por Autor" />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="6" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <BarChart data={graficoBarrasDataEditora} title="Quantidade de Livros por Editora" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
            <Col lg="6" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <PieChart data={graficoBarrasDataGenero} title="Quantidade de Livros por Genero" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container >
    );
}

export default Dashboard;
