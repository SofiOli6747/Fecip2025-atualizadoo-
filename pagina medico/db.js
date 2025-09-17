import pkg from "pg";
const { Client } = pkg;

console.log("Conectando ao banco de dados 2...");

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'farmabusca',
  password: '6747',
  port: 5432,
});

client.connect()
  .then(() => console.log("Conectado ao PostgreSQL!"))
  .catch(err => console.error("Erro de conexÃ£o", err));

export default client; 