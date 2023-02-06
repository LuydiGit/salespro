import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 100%;
  margin: 20px auto;
  word-break: keep-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;


//Texto da tabela
export const Th = styled.th`
  text-align: center;
  border-bottom: inset;
  padding-bottom: 15px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ produtos, setProdutos, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idproduto) => {
    await axios
      .delete("http://localhost:8800/" + idproduto)
      .then(({ data }) => {
        const newArray = produtos.filter((produto) => produto.idproduto !== idproduto);

        setProdutos(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Preço Unidade</Th>
          <Th onlyWeb>Marca</Th>
          <Th>Data de Validade</Th>
          <Th>Qtd Por Unidade</Th>
          <Th>Unidade Em Estoque</Th>
          <Th>UN.Em Ordem</Th>
          <Th>Categoria</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {produtos.map((item, i) => (
          <Tr key={i}>
            <Td width="15%">{item.nome}</Td>
            <Td width="10%">{item.precoUnidade}</Td>
            <Td width="12%" onlyWeb>{item.NomeMarca}</Td>
            <Td width="12%">{item.DataDeValidade}</Td>
            <Td width="12%">{item.QtdPorUnidade}</Td>
            <Td width="12%">{item.UnidadeEmEstoque}</Td>
            <Td width="12%">{item.UnidadeEmOrdem}</Td>
            <Td width="12%">{item.nomeCategoria}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idproduto)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
