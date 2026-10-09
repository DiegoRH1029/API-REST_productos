import express, { Application } from 'express';
import routes from './routes';

export class Server {
  public app: Application;
  public port: any;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Necesario para leer JSON en los POST/PUT/PATCH
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', routes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}