const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const { id, title, text } = req.body;

    if (req.body) {
        const newNote = { id: uuid(), title, text };
        readAndAppend(newNote, './db/db.json');
        res.json(`New Note Added Successfully!`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req, res) => {
    const deletingNoteId = req.params.id;
    console.log(deletingNoteId);
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const updatedList = json.filter((notes) => notes.id !== deletingNoteId);
            writeToFile(`./db/db.json`, updatedList);
            res.json(`Item ${deletingNoteId} has been deleted!`);
        });
});

module.exports = notes;