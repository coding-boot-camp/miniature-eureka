//import required libraries 
//express 
//
const notes = require('express').Router();
const fs =  require('fs')
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid')

//GET route that retrieves all the notes 
notes.get('/', (req,res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
)

//POST to submit and save notes
notes.post('/', (req,res) => {
    // Deconstruct items
    const {title,text} = req.body;

    //Check to make sure all properties are present 
    if (title && text) {
        //object that will be saved 
        const newNote = {title, text, id: uuidv4()};

        //append object to the database 
        readAndAppend(newNote, './db/db.json')

        //object holding, status and note content
        const response = {
            status: 'success',
            body: newNote
        };

        res.json(response);
    }
    else {
        res.json('Error in saving notes ')
    }
});
/*
app.delete('/api/notes/:id', (req,res) => 
  
);*/

module.exports = notes;