import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const items = [
  { "id": 1, "name": "kivi" },
  { "id": 2, "name": "bisse" },
  { "id": 3, "name": "makkara" }
];

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.listen(port, hostname, () => {
  console.log(`Express-palvelin pyörii osoitteessa http://${hostname}:${port}`);
});
