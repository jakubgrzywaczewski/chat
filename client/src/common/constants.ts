export const DOMAIN_URL = 'http://localhost:5000/';

export type User = {
  id: string;
  name: string;
  room: string;
};

export enum SOCKET_EVENTS {
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  JOIN = 'join_room',
  MESSAGE = 'message',
  SEND_MESSAGE = 'send_message',
  USERS_DATA = 'users_data',
}
