import express from "express";
import produtoRoutes from "./routes/produtos.js";
import cors from "cors";

const app = express();

app.use(express.json()); //para ultilizar as alterações put
app.use(cors()); //Evitar conflitos de acesso localmente

app.use("/", produtoRoutes);

app.listen(8800); //Escuta a porta