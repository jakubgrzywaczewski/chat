export enum ROUTES {
  DOMAIN_URL = 'http://localhost:3000',
  LOGOUT = '/auth/logout',
}

export enum SOCKET_EVENTS {
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  JOIN = 'join_room',
  MESSAGE = 'message',
  SEND_MESSAGE = 'send_message',
  USERS_DATA = 'users_data',
}
