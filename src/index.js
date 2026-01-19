import express from 'express';
import {delItem, getItems, getItemsById, putItem, postItem} from './items.js';
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

// GET: hakee kaikki kohteet
app.get('/items', getItems);
// GET: hakee tietyn kohteen ID:n perusteella
app.get('/items/:id', getItemsById);



app.put('/items/:id',putItem);
app.delete('/items/:id', delItem);
app.post('/items/:id', postItem);

app.listen(port, hostname, () => {
  console.log(`Express-palvelin pyörii osoitteessa http://${hostname}:${port}`);
});
