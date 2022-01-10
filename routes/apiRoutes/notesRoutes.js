const router = require('express').Router();
const { validateNote, createNewNote } = require('../../lib/notesHelper');
const { notes } = require("../../db/db.json");
const { v1: uuidv1 } = require('uuid');

router.get('/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = uuidv1()

  if (!validateNote(req.body)) {
    res.status(400).send('Missing data.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
