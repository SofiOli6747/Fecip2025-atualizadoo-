import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const port = 3000;

import cors from "cors";
app.use(cors());

// Conexão com o banco
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "farmabusca",
  password: "6747",
  port: 5432,
});

app.get("/buscar", async (req, res) => {
  const termo = req.query.termo;
  try {
    const resultados = await db.query(
      "SELECT nome FROM medicamento WHERE nome ILIKE $1",
      [`%${termo}%`]
    ); 
    res.json(resultados.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar dados");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

console.log("Termo recebido:", termo);
