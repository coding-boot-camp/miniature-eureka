const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');

const PORT = process.env.port || 3001;

const app = express();

// Render CSS for notes page with static assets
app.use(express.static('public'));

// HTML route for notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// API route: get request to read db.json and return all saved notes as JSON
app.get('/api/notes', (req, res) => res.json(notesData))

// API route: post request to add new notes to db.json + return new note to client

// Wildcard HTML route for index.html
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

// Listen for connections
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);