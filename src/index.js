import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// dummy data
let items = [
  { id: 1, name: 'kivi' },
  { id: 2, name: 'bisse' },
  { id: 3, name: 'makkara' },
  { id: 4, name: 'capybara' },
  { id: 5, name: 'joni' },
  { id: 6, name: 'kissa' },
  { id: 7, name: 'mikkihiiri' },
  { id: 8, name: 'lonkero' },
  { id: 9, name: 'laivareissu' },
];

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// GET: hakee kaikki kohteet
app.get('/items', (req, res) => {
  res.json(items);
});

// GET: hakee tietyn kohteen ID:n perusteella
app.get('/items/:id', (req, res) => {
  const itemFound = items.find((item) => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json({ message: 'New item added', item: newItem });
});

// PUT: päivittää olemassa olevan kohteen
app.put('/items/:id', (req, res) => {
  const itemIndex = items.findIndex((item) => item.id == req.params.id);

  if (itemIndex !== -1) {
    items[itemIndex].name = req.body.name || items[itemIndex].name;
    res.json({ message: 'Item updated', item: items[itemIndex] });
  } else {
    res.status(404).json({ message: 'Item not found, cannot update' });
  }
});

// DELETE: poistaa kohteen ID:n perusteella
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex((item) => item.id == req.params.id);

  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json({ message: 'Item deleted', item: deletedItem[0] });
  } else {
    res.status(404).json({ message: 'Item not found, cannot delete' });
  }
});

app.listen(port, hostname, () => {
  console.log(`Express-palvelin pyörii osoitteessa http://${hostname}:${port}`);
});
