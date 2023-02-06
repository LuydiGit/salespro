import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

//Container da Forma de dados de entrada
const FormContainer = styled.form` 
  display: flex; 
  align-items: flex-end;
  gap: 10px;
  flex-wrap: nowrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;


// Botão de salvar
const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #1F482A;
  color: white;
  height: 42px;
`;

const Form = ({ getProdutos, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const produto = ref.current;

      produto.nome.value = onEdit.nome;
      produto.precoUnidade.value = onEdit.precoUnidade;
      produto.Marca.value = onEdit.Marca;
      produto.DataDeValidade.value = onEdit.DataDeValidade;
      produto.QtdPorUnidade.value = onEdit.QtdPorUnidade;
      produto.UnidadeEmEstoque.value = onEdit.UnidadeEmEstoque;
      produto.UnidadeEmOrdem.value = onEdit.UnidadeEmOrdem;
      produto.IdCategoria.value = onEdit.IdCategoria;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produto = ref.current;

    if (
      !produto.nome.value ||
      !produto.precoUnidade.value ||
      !produto.Marca.value ||
      !produto.DataDeValidade.value ||
      !produto.QtdPorUnidade.value ||
      !produto.UnidadeEmEstoque.value ||
      !produto.UnidadeEmOrdem.value ||
      !produto.IdCategoria.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.idproduto, {
          nome: produto.nome.value,
          precoUnidade: produto.precoUnidade.value,
          Marca: produto.Marca.value,
          DataDeValidade: produto.DataDeValidade.value,
          QtdPorUnidade: produto.QtdPorUnidade.value,
          UnidadeEmEstoque: produto.UnidadeEmEstoque.value,
          UnidadeEmOrdem: produto.UnidadeEmOrdem.value,
          IdCategoria: produto.IdCategoria.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: produto.nome.value,
          precoUnidade: produto.precoUnidade.value,
          Marca: produto.Marca.value,
          DataDeValidade: produto.DataDeValidade.value,
          QtdPorUnidade: produto.QtdPorUnidade.value,
          UnidadeEmEstoque: produto.UnidadeEmEstoque.value,
          UnidadeEmOrdem: produto.UnidadeEmOrdem.value,
          IdCategoria: produto.IdCategoria.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    produto.nome.value = "";
    produto.precoUnidade.value = "";
    produto.Marca.value = "";
    produto.DataDeValidade.value = "";
    produto.QtdPorUnidade.value = "";
    produto.UnidadeEmEstoque.value = "";
    produto.UnidadeEmOrdem.value = "";
    produto.IdCategoria.value = "";

    setOnEdit(null);
    getProdutos();
  };

  // Front
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>

      <InputArea>
        <Label>Preço Unidade</Label>
        <Input name="precoUnidade" />
      </InputArea>

      <InputArea>
        <Label>Marca</Label>
        <Input name="Marca" />
      </InputArea>

      <InputArea>
        <Label>Data De Validade</Label>
        <Input name="DataDeValidade" type="date" />
      </InputArea>

      <InputArea>
       <Label>QtdPorUnidade</Label>
       <Input name="QtdPorUnidade" />
      </InputArea>

      <InputArea>
        <Label>UN.EmEstoque</Label>
        <Input name="UnidadeEmEstoque" />
      </InputArea>

      <InputArea>
        <Label>UN.EmOrdem</Label>
        <Input name="UnidadeEmOrdem" />
      </InputArea>
      
      <InputArea>
        <Label>Id Categoria</Label>
        <Input name="IdCategoria" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
