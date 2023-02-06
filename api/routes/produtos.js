import express from "express";
import { 
    addProduto, 
    deleteProduto, 
    getProdutos, 
    updateProduto
} from "../controllers/produto.js";

const router = express.Router();
//Retorna
router.get("/", getProdutos); //get na raiz da rota
//Adiciona
router.post("/", addProduto);
//Atualiza
router.put("/:idproduto", updateProduto);
//Deleta
router.delete("/:idproduto", deleteProduto);

export default router;