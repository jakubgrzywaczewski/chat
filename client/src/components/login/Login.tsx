import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input placeholder="Room" type="text" onChange={(e) => setRoom(e.target.value)} />
      </div>
      <Link
        to={`/chat?name=${username}&room=${room}`}
        onClick={(e) => (!username || !room ? e.preventDefault() : null)}
      >
        <button type="submit">Join room</button>
      </Link>
    </div>
  );
};

export default Login;
