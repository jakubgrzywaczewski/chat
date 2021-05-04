const users = [];

type User = {
  id: string;
  name: string;
  room: string;
};

type Error = {
  error: string;
};

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

const removeUser = (id: string): string[] => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id: string): number | undefined => users.find((user) => user.id === id);

const getUsersInRoom = (room: string): string[] => users.filter((user) => user.room === room);

export { addUser, removeUser, getUser, getUsersInRoom };
