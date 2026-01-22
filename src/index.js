import express from 'express';
import {delItem, getItems, getItemsById, putItem, postItem} from './items.js';
import { getUsers, getUserById, postUser, postLogin, putUser, delUser } from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;


// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());
// tarjoillaa front-end sivusto palvelimen juuresta
app.use('/', express.static('public'));

// api root
app.get('/api', (req, res) => {
  res.send('This is my dummy API!');
});

// items
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemsById);
app.put('/api/items/:id',putItem);
app.delete('/api/items/:id', delItem);
app.post('/api/items/', postItem);

// users
app.get('/api/users', getUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users', postUser);
app.post('/api/users/login', postLogin);
app.put('/api/users/:id', putUser);
app.delete('/api/users/:id', delUser);

app.listen(port, hostname, () => {
  console.log(`Express-palvelin pyörii osoitteessa http://${hostname}:${port}`);
});
