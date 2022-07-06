const notes = require('express').Router();
// GET Route for retrieving all the notes = /api/notes/
notes.get('/api/notes', (req, res) => {
  //readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
  res.json({'hello': 'world'})
});