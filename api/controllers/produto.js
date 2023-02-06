import { db } from "../db.js";


//CRUD
export const getProdutos = (_, res) => { //Consulta que retorna os dados de produtos substituindo o id da marca e categoria por seus nomes
  const q = "SELECT produto.idproduto, produto.nome, produto.precoUnidade, marca.NomeMarca , produto.DataDeValidade, produto.QtdPorUnidade, produto.UnidadeEmEstoque, produto.UnidadeEmOrdem, categoria.nomeCategoria FROM produto INNER JOIN marca ON marca.IdMarca = produto.Marca LEFT JOIN categoria ON categoria.IdCategoria = produto.IdCategoria";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addProduto = (req, res) => {//Adicionar produtos
  const q =
    "INSERT INTO produto(`nome`, `precoUnidade`, `Marca`, `DataDeValidade`, `QtdPorUnidade`, `UnidadeEmEstoque`, `UnidadeEmOrdem`, `IdCategoria`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.precoUnidade,
    req.body.Marca,
    req.body.DataDeValidade,
    req.body.QtdPorUnidade,
    req.body.UnidadeEmEstoque,
    req.body.UnidadeEmOrdem,
    req.body.IdCategoria,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto cadastrado com sucesso.");
  });
};

export const updateProduto = (req, res) => { //Atualiza Produtos
  const q =
    "UPDATE produto SET nome = ?, precoUnidade = ?, Marca = ?, DataDeValidade = ?, QtdPorUnidade = ?, UnidadeEmEstoque = ?, UnidadeEmOrdem = ?, IdCategoria = ? WHERE produto.idproduto = ?";

  const values = [
    req.body.nome,
    req.body.precoUnidade,
    req.body.Marca,
    req.body.DataDeValidade,
    req.body.QtdPorUnidade,
    req.body.UnidadeEmEstoque,
    req.body.UnidadeEmOrdem,
    req.body.IdCategoria,
  ];

  db.query(q, [...values, req.params.idproduto], (err) => {
    console.log(err)
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};

export const deleteProduto = (req, res) => { //Deleta produtos
  const q = "DELETE FROM produto WHERE `idproduto` = ?";

  db.query(q, [req.params.idproduto], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado com sucesso.");
  });
};
