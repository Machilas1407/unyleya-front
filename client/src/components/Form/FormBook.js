import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

// API
import AutorAPI from '../../service/Autor';
import EditoraAPI from '../../service/Editora';
import GeneroAPI from '../../service/Genero';
import LivroAPI from '../../service/Livro'


function FormBook() {
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ titulo: "", autor_id: null, genero_id: null, editora_id: null, ano_lancamento: "" })

  useEffect(async () => {
    let { data: autores } = await AutorAPI.getAll()
    let { data: generos } = await GeneroAPI.getAll()
    let { data: editoras } = await EditoraAPI.getAll()
    setAutores(autores)
    setGeneros(generos.data)
    setEditoras(editoras)
    loadingLista(autores, generos, editoras)




  }, [])


  const loadingLista = (autores, generos, editoras) => {
    console.log(autores, generos.data, editoras)
    setLoading(false)

    if (autores != [] && generos != [] && editoras != []) {
      console.log("TEst")
      setForm({ ...form, autor_id: autores[0].id, genero_id: generos.data[0].id, editora_id: editoras[0].id })
    }
  }

  const enviar = (e) => {

    e.preventDefault();
    console.log(e)
    console.log(form)
    LivroAPI.createOne(form)
      .then((data) => {
        console.log(data)
        window.location.reload()
      })

  }

  return (
    <>
      {!loading &&
        <Form onSubmit={enviar}>
          <Form.Group className="mb-3">
            <Form.Label>Titulo do Livro</Form.Label>
            <Form.Control onChange={(e) => setForm({ ...form, titulo: e.target.value })} name="titulo" placeholder="Titulo do Livro" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Selecione o Autor</Form.Label>
            <Form.Control onChange={(e) => setForm({ ...form, autor_id: e.target.value })} name="autor" as="select" custom>
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>{autor.nome}</option>
              ))}

            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Selecione o Genero</Form.Label>
            <Form.Control onChange={(e) => setForm({ ...form, genero_id: e.target.value })} name="genero" as="select" custom>
              {generos.map((genero) => (
                <option value={genero.id}>{genero.nome}</option>
              ))}

            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Selecione a Editora</Form.Label>
            <Form.Control onChange={(e) => setForm({ ...form, editora_id: e.target.value })} name="editora" as="select" custom>
              {editoras.map((editora) => (
                <option value={editora.id}>{editora.nome}</option>
              ))}

            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ano de Lançamento</Form.Label>
            <Form.Control onChange={(e) => setForm({ ...form, ano_lancamento: e.target.value })} name="lancamento" placeholder="Ano de Lançamento" />
          </Form.Group>

          <Button type="submit" variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      }
    </>
  );
}

export default FormBook;