import express from "express";
import cors from "cors";
import client from "./db.js";


const app = express();
app.use(cors());
app.use(express.json());


app.get("/medicamento/termo", async (req, res) => {
  const termo = req.query.termo;
  try {
    let resultados;
    if(termo){
      resultados = await client.query(
        "SELECT * FROM medicamento WHERE nome ILIKE $1",
        [`%${termo}%`]
      ); 
    } else {
      resultados = await client.query("SELECT * FROM medicamento");
    }
    res.json(resultados.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar dados");
  }
});

app.get("/medicamento/marca", async (req, res) => {
  const marca = req.query.marca;
  try {
    const resultados = await client.query(
      "SELECT * FROM medicamento WHERE marca ILIKE $1",
      [`%${marca}%`]
    ); 
    res.json(resultados.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar dados");
  }
});

app.get("/medicamento/categoria", async (req, res) => {
  const categoria = req.query.categoria;
  try {
    const resultados = await client.query(
      "SELECT * FROM medicamento WHERE categoria ILIKE $1",
      [`%${categoria}%`]
    ); 
    res.json(resultados.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar dados");
  }
});


app.get("/medicamento/preco", async (req, res) => {
    const min = parseFloat(req.query.min);
    const max = parseFloat(req.query.max);
  try {
    const resultados = await client.query(
      "SELECT * FROM medicamento WHERE preco BETWEEN $1 AND $2",
      [min,max]
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



app.get("/sintomas_medicamentos/sintoma", async (req, res) => {
  const sintoma = req.query.sintoma;
  try {
    const resultados = await client.query(
      `SELECT 
  s.nome AS sintoma,
  STRING_AGG(DISTINCT c.nome_causa, ', ') AS causas_comuns,
  STRING_AGG(DISTINCT m.nome, ', ') AS medicamentos
FROM sintomas_medicamentos sm
LEFT JOIN sintomas s ON sm.id_sintoma = s.id_sintoma
LEFT JOIN medicamento m ON sm.id_medicamento = m.id_medicamento
LEFT JOIN sintomas_causas sc ON s.id_sintoma = sc.id_sintoma
LEFT JOIN causas_comuns c ON sc.id_causa = c.id_causa
WHERE LOWER(s.nome) LIKE LOWER($1)
GROUP BY s.nome`,
      [`%${sintoma}%`]
    ); 
    res.json(resultados.rows);
  }catch (err) {
    console.error('Erro ao buscar dados:', err.message);
    res.status(500).send('Erro interno no servidor');
}
});



app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

