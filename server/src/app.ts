import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as http from 'http';

import { Server } from 'socket.io';

import { ROUTES, SOCKET_EVENTS } from './common/constants';
import { addUser, getUser, getUsersInRoom, removeUser } from './services/users';

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
        origin: ROUTES.DOMAIN_URL,
        methods: ['GET', 'POST'],
      },
    });

    io.on(SOCKET_EVENTS.CONNECT, (socket) => {
      socket.on(SOCKET_EVENTS.JOIN, ({ name, room }, callback) => {
        const { id } = socket;
        const result = addUser({ id, name, room });

        if ('error' in result) {
          callback(result.error);
        }

        socket.emit(SOCKET_EVENTS.MESSAGE, { user: 'Chatbot', text: `Hi, ${name}` });
        socket.broadcast
          .to(room)
          .emit(SOCKET_EVENTS.MESSAGE, { user: 'Chatbot', text: `${name} has joined the room` });
        socket.join(room);

        callback();
      });

      socket.on(SOCKET_EVENTS.SEND_MESSAGE, (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit(SOCKET_EVENTS.MESSAGE, { user: user.name, text: message });
        callback();
      });

      socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        const user = removeUser(socket.id);

        if (user) {
          io.to(user.room).emit(SOCKET_EVENTS.MESSAGE, {
            user: 'Chatbot',
            text: `${user.name} has left.`,
          });
          io.to(user.room).emit(SOCKET_EVENTS.USERS_DATA, {
            room: user.room,
            users: getUsersInRoom(user.room),
          });
        }
      });
    });
  }

  public listen(): void {
    this.httpServer.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
