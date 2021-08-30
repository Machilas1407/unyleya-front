import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

// API
import EditoraAPI from '../../service/Editora';


function FormPublishingCompany() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: "" })

  useEffect(async () => {
    setLoading(false)
  }, [])



  const enviar = (e) => {

    e.preventDefault();
    console.log(e)
    console.log(form)

    EditoraAPI.createOne(form)
      .then((data) => {
        console.log(data)
        window.location.reload()
      })



  }

  return (
    <Form onSubmit={enviar}>
      <Form.Group className="mb-3">
        <Form.Label>Nome da Editora</Form.Label>
        <Form.Control onChange={(e) => setForm({ ...form, nome: e.target.value })} name="nome" placeholder="Nome da Editora" />
      </Form.Group>



      <Button type="submit" variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
}

export default FormPublishingCompany;