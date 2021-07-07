const express = require('express');

const server = express();
server.use(express.json());

let data = [
  {
    id: 0,
    item: 'stuff',
    quantity: 1
  },
  {
    id: 1,
    item: 'junk',
    quantity: 7
  },
  {
    id: 2,
    item: 'misc',
    quantity: 2
  }
];
let nextId = 3;

server.get('/', (req, res) => {
  res.status(200).json(data);
});

server.post('/', (req, res) => {
  data.push({ ...req.body, id: nextId++ });
  res.status(201).json(data[data.length - 1]);
});

server.delete('/:id', (req, res) => {
  const { id } = req.params;
  data = data.filter(e => e.id != id);
  res.status(204).end();
});

module.exports = server;