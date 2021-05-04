import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import { DOMAIN_URL, SOCKET_EVENTS, User } from '../../common/constants';

let socket: any;

const Chat: React.FC = () => {
  const [userName, setUsername] = useState<string | string[] | null>('');
  const [roomName, setRoom] = useState<string | string[] | null>('');
  const [users, setUsers] = useState<User[]>();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(DOMAIN_URL);

    setUsername(name);
    setRoom(room);

    socket.emit(SOCKET_EVENTS.JOIN, { name, room });

    return () => {
      socket.emit(SOCKET_EVENTS.DISCONNECT);
      socket.off();
    };
  }, [DOMAIN_URL, window.location.search]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.MESSAGE, (message: string) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on(SOCKET_EVENTS.USERS_DATA, (users: React.SetStateAction<User[] | undefined>) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (message) {
      socket.emit(SOCKET_EVENTS.SEND_MESSAGE, message, () => setMessage(''));
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <input />
    </div>
  );
};

export default Chat;
