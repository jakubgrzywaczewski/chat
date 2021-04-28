import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as http from 'http';

import { Server } from 'socket.io';

import { ROUTES } from './common/constants';

class App {
  public app: express.Application;
  public server;
  public io;
  public port: number;

  constructor(routes: express.Router[], port: number) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: ROUTES.DOMAIN,
        credentials: true,
      }),
    );

    this.app.use(helmet());
  }

  private initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(route);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
