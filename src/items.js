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

const getItems =  (req, res) => {
  res.json(items);
};

const getItemsById = (req, res) => {
  const itemFound = items.find((item) => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

const putItem =  (req, res) => {
  const itemIndex = items.findIndex((item) => item.id == req.params.id);

  if (itemIndex !== -1) {
    items[itemIndex].name = req.body.name || items[itemIndex].name;
    res.json({ message: 'Item updated', item: items[itemIndex] });
  } else {
    res.status(404).json({ message: 'Item not found, cannot update' });
  }
};
const delItem = (req, res) => {
  const itemIndex = items.findIndex((item) => item.id == req.params.id);
  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json({ message: 'Item deleted', item: deletedItem[0] });
  } else {
    res.status(404).json({ message: 'Item not found, cannot delete' });
  }
};

const postItem =  (req, res) => {
  const newId =
    items.length > 0
      ? Math.max(...items.map(item => item.id)) + 1: 1;
  const newItem = { id: newId, item: req.body };
  items.push(newItem);
  res.status(201).json({
    message: 'new item added',
    item: newItem
  });
};

export {getItems, getItemsById, putItem, delItem, postItem};
