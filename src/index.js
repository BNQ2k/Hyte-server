import express from 'express';
import {delItem, getItems, getItemsById, putItem, postItem} from './items.js';
import { getUsers, getUserById, postUser, putUser, delUser } from './users.js';
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
app.get('/items', getItems);
app.get('/items/:id', getItemsById);
app.put('/items/:id',putItem);
app.delete('/items/:id', delItem);
app.post('/items/:id', postItem);

// users
app.get('/api/users', getUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users', postUser);
app.put('/api/users/:id', putUser);
app.delete('/api/users/:id', delUser);

app.listen(port, hostname, () => {
  console.log(`Express-palvelin pyörii osoitteessa http://${hostname}:${port}`);
});
