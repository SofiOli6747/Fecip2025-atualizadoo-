import pkg from "pg";
const { Client } = pkg;

console.log("Conectando ao banco de dados 2...");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}); 
client.connect()
  .then(() => console.log("Conectado ao PostgreSQL!"))
  .catch(err => console.error("Erro de conexÃ£o", err));

export default client; 