
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const { createNewNote } = require('../model/createNote'); // Assuming the correct path to the external module
const dbPath = path.join(__dirname, '../db/db.json');
const db = require(dbPath); // Import the db.json directly

// Route to get notes from the database
router.get('/api/notes', (req, res) => {
  try {
    res.json(db.notes); // Assuming that the notes are stored in the "notes" property of db.json
  } catch (error) {
    res.status(500).json({ error: 'Error reading notes.' });
  }
});

// Route to save a new note to the database
router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid(); // Generate a unique ID for the new note

  try {
    createNewNote(newNote, db.notes); // Assuming createNewNote is a function that adds the new note to the "notes" property of db.json
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Error saving the note.' });
  }
});

module.exports = router;
