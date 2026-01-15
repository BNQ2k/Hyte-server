import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;
// dummy mock data(nollautuu aina, kun sovellus käynnistetään uudelleen)
const items = [
  { "id": 1, "name": "kivi" },
  { "id": 2, "name": "bisse" },
  { "id": 3, "name": "makkara" },
  { "id": 4, "name": "capybara" },
  { "id": 5, "name": "joni" },
  { "id": 6, "name": "kissa" },
  { "id": 7, "name": "mikkihiiri" },
  { "id": 8, "name": "lonkero" },
  { "id": 9, "name": "laivareissu" }
];
// parsitaan json data req-objektista
app.use(express.json());
app.get('/', (req, res) => {
  res.send('This is my dummy items API!');
});

// get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// get item based on id
app.get('/items/:id', (req, res) => {
  console.log('getting item id:', req.params.id);
  const itemFound = items.find(item => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);

  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// TODO: add PUT route for item
// TODO: add DELETE route for items



// add new item
app.post('/items', (req, res) => {
  //console.log('add item request body', req.body);
  items.push(req.body);
  res.status(201).json({ message: 'new item added' });
});

app.listen(port, hostname, () => {
  console.log(`Express-palvelin pyörii osoitteessa http://${hostname}:${port}`);
});
