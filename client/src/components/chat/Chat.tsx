import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import { DOMAIN_URL } from '../../common/constants';

let socket: any;

const Chat: React.FC = () => {
  const [userName, setUsername] = useState<string | string[] | null>('');
  const [roomName, setRoom] = useState<string | string[] | null>('');

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(DOMAIN_URL);

    setUsername(name);
    setRoom(room);

    socket.emit('join_room', { name, room });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [DOMAIN_URL, window.location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
