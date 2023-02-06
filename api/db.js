import mysql from "mysql" //importar o mysql

export const db = mysql.createConnection({ //Criando conexão com banco de dados
    host: "localhost",                     //Dados do banco
    user: "root",
    password: "My@2023",
    database: "salespro"
})