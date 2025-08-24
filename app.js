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

app.get("/marcas", async (req, res) => {
  const marca = req.query.marca;
  try {
    const resultados = await client.query(
      "SELECT * FROM medicamento WHERE marca = $1",
      [`%${marca}%`]
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



app.get("/medicamentos-sintoma", async (req, res) => {
  const sintoma = req.query.sintoma;
  try {
    const resultados = await client.query(
      `SELECT DISTINCT m.nome, m.marca, m.preco
       FROM medicamento m
       JOIN sintomas_medicamentos mc ON m.id_medicamento = mc.id_medicamento
       JOIN causas_comuns c ON mc.id_causa = c.id_causa
       JOIN sintomas_causas sc ON c.id_causa = sc.id_causa
       JOIN sintomas s ON sc.id_sintoma = s.id_sintoma
       WHERE LOWER(s.nome) LIKE LOWER($1)`,
      [`%${sintoma}%`]
    ); 
    res.json(resultados.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar dados");
  }
});



app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

