const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteFromJSON } = require('../../helpers/fsUtils');

// GET route for getting all notes in JSON format
notes.get('/', (req,res) => {
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for posting a new note to the db
notes.post('/', (req,res) => {
    readAndAppend(req.body, 'db/db.json');

    const response = {
        status: 'success',
        body: req.body,
      };
  
    res.json(response);
});

// DELETE route for deleting a note
notes.delete('/:id', (req,res) => {
    deleteFromJSON('db/db.json', req.params.id);

    const response = {
        status: `success: deletion of note ${req.params.id}`,
        body: req.body,
      };
  
    res.json(response);
});

module.exports = notes;