// const fs = require('fs');
// const path = require('path');
// const dbPath = path.join(__dirname, '../db/db.json');

// module.exports = (app) => {
//   app.get('/api/notes', (req, res) => {
//     // Read notes from db.json and return them as JSON.
//     try {
//       const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ error: 'Error reading notes.' });
//     }
//   });

//   app.post('/api/notes', (req, res) => {
//     // Receive a new note, add it to db.json, and return the new note.
//     const newNote = req.body;
//     newNote.id = uuidv4(); // Generate a unique ID for the new note

//     try {
//       const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
//       data.push(newNote);
//       fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
//       res.json(newNote);
//     } catch (error) {
//       res.status(500).json({ error: 'Error saving the note.' });
//     }
//   });
// };
const router = require('express').Router;
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/db.json');
const uuid  = require('uuid');


  // Route to get notes from the database
  router.get('/api/notes', (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error reading notes.' });
    }
  });

  // Route to save a new note to the database
  router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid(); // Generate a unique ID for the new note

    try {
      const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      data.push(newNote);
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
      res.json(newNote);
    } catch (error) {
      res.status(500).json({ error: 'Error saving the note.' });
    }
  });

module.exports = router;