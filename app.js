import express from "express";
import cors from "cors";
import client from "./db.js";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/medicamento", async (req, res) => {
  const termo = req.query.termo;
  try {
    const resultados = await client.query(
      "SELECT * FROM medicamento WHERE nome ILIKE $1",
      [`%${termo}%`]
    ); 
    res.json(resultados.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar dados");
  }
});


app.get("/autocomplete", async (req, res) => {
  const termo = req.query.termo;
  try {
    const resultado = await client.query(
      "SELECT nome FROM medicamento WHERE nome ILIKE $1",
      [`%${termo}%`]
    ); 
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar dados");
  }
});



app.listen(5500, () => {
  console.log('Servidor rodando na porta 5500');
});

