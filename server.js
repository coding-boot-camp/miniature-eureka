const express = require('express');
const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const notes = require('./db/db.json');

const PORT = process.env.port || 3001;

const app = express();

// Render CSS for notes page with static assets
app.use(express.static('public'));

// Middleware for parsing application/jsonand urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTML route for notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// API route: get request to read db.json and return all saved notes as JSON
app.get('/api/notes', (req, res) => res.json(notes))

// API route: post request to add new notes to db.json + return new note to client
app.post('/api/notes', (req, res) => {
    // save the note info in a variable newNote
    const newNote = req.body;
    // gives the new note a new unique id
    newNote.id = uuidv1();
    // adds the new note to the list of notes
    notes.push(newNote);
    // updates the db.json file with the updated list of notes (including the new note)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes)
    )
    // returns the updated list of notes (including the new note) as a response
    res.json(notes);
})

// API route to delete notes
app.delete('/api/notes/:id', (req, res) => {
    // sets the id of the note to be deleted in a variable
    const deletedId = req.params.id;
    // filter method to create new list of notes without the deleted note
    const updatedNotes = notes.filter(function(data) {
        if (data.id !== deletedId) {
          return true;
        }
    });
    // updates the db.json file with the updated list of notes (without the removed note)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(updatedNotes)
    )
    // send updated list without deleted note to client side
    res.json(notes);
})

// Wildcard HTML route for index.html
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

// Listen for connections
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);