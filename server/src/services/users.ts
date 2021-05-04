type User = {
  id: string;
  name: string;
  room: string;
};

type Error = {
  error: string;
};

let users: Array<User>;

const addUser = ({ id, name, room }: User): Error | User => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUsers = users.find((user) => user.room === room && user.name === name);

  if (existingUsers) {
    return { error: 'User already exists in this room' };
  }

  const user = { id, name, room };
  users.push(user);

  return user;
};

const removeUser = (id: string): User => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id: string): User | undefined => users.find((user) => user.id === id);

const getUsersInRoom = (room: string): User[] => users.filter((user) => user.room === room);

export { addUser, removeUser, getUser, getUsersInRoom };
