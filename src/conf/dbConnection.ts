import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool: any = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000 
});

// PRUEBA DE CONEXIÓN AUTOMÁTICA
pool.getConnection()
  .then((connection: any) => {
    console.log("🟢 ¡Conexión a la base de datos EXITOSA!");
    connection.release();
  })
  .catch((err: any) => {
    console.log("🔴 ERROR DE BASE DE DATOS:", err.message);
  });

export default pool;