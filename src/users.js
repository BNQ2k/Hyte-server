//TODO: add users mock data and endpoints
let users = [
  { id: 1, name: 'Juhani', email: 'juhani@gmail.com' },
  { id: 2, name: 'Bena', email: 'bena@hotmail.com' },
  { id: 3, name: 'Capy', email: 'capy@outlook.com' },
  { id: 4, name: 'Joni', email: 'jonikauk@kivi.fi' },
  { id: 5, name: 'Mikko', email: 'mikko@kivi.com' },
  { id: 6, name: 'Jesse', email: 'jesse@lonkero.com'},
];
// hakee kaikki
const getUsers = (req, res) => {
  res.json(users);
};

// id:llä
const getUserById = (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
};

// uusi user
const postUser = (req, res) => {
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: newId, ...req.body };
  users.push(newUser);
  res.status(201).json({ message: 'User added', user: newUser });
};

// edit user
const putUser = (req, res) => {
  const index = users.findIndex((u) => u.id == req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json({ message: 'User updated', user: users[index] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// del
const delUser = (req, res) => {
  const index = users.findIndex((u) => u.id == req.params.id);
  if (index !== -1) {
    const deleted = users.splice(index, 1);
    res.json({ message: 'User deleted', user: deleted[0] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
export { getUsers, getUserById, postUser, putUser, delUser };
