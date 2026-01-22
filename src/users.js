//TODO: add users mock data and endpoints
let users = [
  { id: 1, name: 'Juhani', password: "sigmaballs", email: 'juhani@gmail.com' },
  { id: 2, name: 'Bena', password: "nakkikiska1",email: 'bena@hotmail.com' },
  { id: 3, name: 'Capy', password: "gargefps", email: 'capy@outlook.com' },
  { id: 4, name: 'Joni', password: "lobermooperuna",email: 'jonikauk@kivi.fi' },
  { id: 5, name: 'Mikko', password: "mikkopetteri-gwagon",email: 'mikko@kivi.com' },
  { id: 6, name: 'Jesse', password: "palikkamies",email: 'jesse@lonkero.com'},
];
// hakee kaikki
const getUsers = (req, res) => {
  const publicUsers = [];

  for (let i = 0; i < users.length; i++) {
    // uusi objekti, johon poimitaan id, username ja email
    const user = {
      id: users[i].id,
      username: users[i].username,
      email: 'private'
    };
    publicUsers.push(user);
  }

  res.json(publicUsers);
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
  const newUser = req.body;
  if (!(newUser.username && newUser.password && newUser.email)) {
    return res.status(400).json({error: 'required fields missing'})
  }
  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  // console.log('registering new user', newUser);
  const newId = users[users.length-1].id + 1;
  users.push({newId, ...newUser});
  delete newUser.password;
  console.log('users', users);
  res.status(201).json({message: 'new user added', user_id: newId });
};

const postLogin = (req, res) => {
  const {username, password} = req.body;
  // hakee käyttäjä-objektin nimen perusteella
  const userFound = users.find(user => username === user.username);
  if (userFound) {
    if (userFound.password === password) {
      delete userFound.password;
      return res.json({message: 'login ok', user: userFound});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
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
export { getUsers, getUserById, postUser, postLogin, putUser, delUser };
