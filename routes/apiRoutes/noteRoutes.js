const router = require('express').Router();
const { createNote, updateNote, findNote, deleteNote} = require('../../lib/notes');
const { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
  res.json(notes);
});

router.post('/notes', (req, res) => {
  if (!req.body.id) {
    createNote(req.body, notes);
  } else {
    updateNote(req.body, notes);
  }

  res.json(req.body);
});

router.delete('/notes/:id', (req, res) => {
  const result = deleteNote(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

module.exports = router;
