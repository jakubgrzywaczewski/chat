import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as http from 'http';

import { Server } from 'socket.io';

import { ROUTES } from './common/constants';

class App {
  public app: express.Application;
  public port: number;
  private httpServer;

  constructor(routes: express.Router[], port: number) {
    this.app = express();
    this.app.use(cors());
    this.app.use(helmet());

    this.port = port;
    this.httpServer = http.createServer(this.app);

    this.initializeSockets();
    this.initializeRoutes(routes);
  }

  private initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(route);
    });
  }

  private initializeSockets() {
    const io = new Server(this.httpServer, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('socket connected');
      socket.on('disconnect', () => console.log('socket disconnected'));
    });
  }

  public listen(): void {
    this.httpServer.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
