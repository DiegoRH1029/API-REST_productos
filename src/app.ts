import dotenv from 'dotenv';
import { Server } from './server';

// Cargar variables de entorno
dotenv.config();

// Inicializar el servidor
const server = new Server();
server.listen();