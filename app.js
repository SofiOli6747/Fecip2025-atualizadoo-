import express from "express";
import cors from "cors";
import client from "./db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




const app = express();
import path from 'path';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//import authRoutes from './auth.js'; 
//app.use('/auth.js', authRoutes);


//cadastro



app.post("/cliente/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
 try {
     await client.query(
       'INSERT INTO cliente (nome, email, senha) VALUES ($1, $2, $3)',
       [nome, email, hash]
     );
     res.send('Usuário cadastrado com sucesso!');
     alert("Cliente cadastrado com sucesso!")
   } catch (err) {
     res.status(400).send('Erro ao cadastrar: ' + err.message);
   }
});



//login



app.post("/cliente/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const result = await client.query('SELECT * FROM cliente WHERE email = $1', [email]);
    const usuario = result.rows[0];

    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      const token = jwt.sign({ id: usuario.id_cliente }, 'empanada', { expiresIn: '1h' });
      console.log(usuario);
      res.json({ mensagem: "Login OK", token })
      //res.send('Login bem-sucedido!');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (err) {
    res.status(500).send('Erro no login: ' + err.message);
  }
});


//autentificação 


function autenticarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'empanada', (err, usuario) => {
    if (err) return res.sendStatus(403);
    req.usuario = usuario;
    console.log(req.usuario.id);
    next();
  });
}



app.post('/cliente/farmacia', autenticarToken, async (req, res) => {
  const { nome, endereco, placeId } = req.body;
  const usuarioId = req.usuario.id;

  try {
    await client.query(
      'INSERT INTO farmacias_salvas (id_cliente, nome, endereco, distancia) VALUES ($1, $2, $3, $4)',
      [usuarioId, nome, endereco, placeId] 
    );
    res.send("Farmácia salva com sucesso!");
  } catch (err) {
    console.error("Erro ao salvar farmácia:", err);
    res.status(500).send("Erro interno ao salvar farmácia.");
  }
});


app.post('/cliente/medicamento', autenticarToken, async (req, res) => {
  const { nome, marca, preco, id_cliente} = req.body;
  const usuarioId = req.usuario.id;


  try {
    await client.query(
      'INSERT INTO medicamentos_salvos (id_cliente, nome, marca, preco) VALUES ($1, $2, $3, $4)',
      [usuarioId, nome, marca, preco] 
    );
    res.send("Medicamento salva com sucesso!");
  } catch (err) {
    console.error("Erro ao salvar medicamento:", err);
    res.status(500).send("Erro interno ao salvar medicamento.");
  }
});


app.post('/cliente/historico', autenticarToken, async (req, res) => {
  const { termo, dataHora} = req.body;
  console.log(termo);
  console.log(req.body);
  const usuarioId = req.usuario.id;


  try {
    await client.query(
      'INSERT INTO historico_pesquisas (busca, data_pesquisa, id_cliente) VALUES ($1, $2, $3)',
      [ termo, dataHora ,usuarioId] 
    );
    res.send("busca salva com sucesso!");
  } catch (err) {
    console.error("Erro ao salvar busca:", err);
    res.status(500).send("Erro interno ao salvar busca.");
  }
});



app.get('/cliente/dados', autenticarToken, async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const medicamentos = await client.query(
      'SELECT nome, marca, preco FROM medicamentos_salvos WHERE id_cliente = $1',
      [usuarioId]
    );

    const farmacias = await client.query(
      'SELECT nome, endereco, distancia FROM farmacias_salvas WHERE id_cliente = $1',
      [usuarioId]
    );

    const historico = await client.query(
      'SELECT busca, data_pesquisa FROM historico_pesquisas WHERE id_cliente = $1 ORDER BY data_pesquisa DESC',
      [usuarioId]
    );

    res.json({
      medicamentos: medicamentos.rows,
      farmacias: farmacias.rows,
      historico: historico.rows
    });
  } catch (err) {
    console.error("Erro ao buscar dados do cliente:", err);
    res.status(500).send("Erro interno ao buscar dados.");
  }
});



app.post('cliente/removerMed', autenticarToken, async (req, res) => {
  const usuarioId = req.usuario.id;

  try{
    const medicamentos = await client.query(
      'DELETE FROM medicamentos_salvos WHERE id_cliente = $1',
      [usuarioId]
    );
    res.json({
      medicamentos: medicamentos.rows
    })

  } catch (err) {
    console.error("Erro ao buscar dados do cliente:", err);
    res.status(500).send("Erro interno ao buscar dados.");
  }
})

//MEDICO


app.post("/medico/cadastro", async (req, res) => {
  const { nome, email, senha, cpf } = req.body;
  const hash = await bcrypt.hash(senha, 10);
 try {
     await client.query(
       'INSERT INTO medico (nome, email, senha, cpf) VALUES ($1, $2, $3, $4)',
       [nome, email, hash, cpf]
     );
     res.send('Médico cadastrado com sucesso!');
     alert("Médico cadastrado com sucesso!")
   } catch (err) {
     res.status(400).send('Erro ao cadastrar: ' + err.message);
   }
});



app.post("/medico/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const result = await client.query('SELECT * FROM medico WHERE email = $1', [email]);
    const usuario = result.rows[0];

    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      const token = jwt.sign({ id: usuario.id_medico }, 'empanada', { expiresIn: '1h' });
      console.log(usuario);
      res.json({ mensagem: "Login OK", token })
      //res.send('Login bem-sucedido!');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (err) {
    res.status(500).send('Erro no login: ' + err.message);
  }
});





//MEDICAMENTOS

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


