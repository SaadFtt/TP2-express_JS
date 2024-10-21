const express = require('express');
const app = express();

app.use(express.json()); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let items = [];

app.post('/items', (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).send(item);
});

app.get('/items', (req, res) => {
    res.send(items);
  });

app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === id);
  
    if (itemIndex !== -1) {
      items[itemIndex] = { ...items[itemIndex], ...req.body };
      res.send(items[itemIndex]);
    } else {
      res.status(404).send('Item not found');
    }
  });


app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.send(deletedItem);
  } else {
    res.status(404).send('Item not found');
  }
});
