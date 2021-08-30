import React, { useEffect, useState } from "react";
import {Form, Button } from "react-bootstrap";

// API
import AutorAPI from '../../service/Autor';


function FormAutor() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({nome: "", data_nasc:"", sexo:"", nacionalidade:""})

  useEffect(async () => { 
    setForm({...form,sexo:"Masculino"})
    setLoading(false)
}, [])



const enviar = (e) => {
  
  e.preventDefault();
    console.log(e)
    console.log(form)
    AutorAPI.createOne(form)
    .then((data)=> {
      console.log(data)
      window.location.reload()
    })

}

  return (
  <Form onSubmit={enviar}>
    <Form.Group className="mb-3">
    <Form.Label>Nome do Autor</Form.Label>
    <Form.Control onChange={(e)=> setForm({...form,nome: e.target.value})} name="titulo" placeholder="Nome do Autor" />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Ano de Nascimento</Form.Label>
    <Form.Control onChange={(e)=> setForm({...form,data_nasc: e.target.value})} name="titulo" placeholder="Data de Nascimento" />
  </Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Sexo do Editor</Form.Label>
  <Form.Control onChange={(e)=> setForm({...form,sexo: e.target.value})}   as="select" custom>
 
   <option value="Masculino">Masculino</option>
   <option value="Feminino">Feminino</option>
   <option value="Outros">Outros</option>
 
    </Form.Control>
</Form.Group>

<Form.Group className="mb-3">
    <Form.Label>Nacionalidade</Form.Label>
    <Form.Control onChange={(e)=> setForm({...form,nacionalidade: e.target.value})} name="lancamento" placeholder="Nacionalidade" />
  </Form.Group>

  <Button type="submit" variant="primary" type="submit">
    Enviar
  </Button>
</Form>
    );
  }
  
  export default FormAutor;