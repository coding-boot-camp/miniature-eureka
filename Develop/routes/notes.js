const notes = require('express').Router();
const path = require('path')
const fs =  require('fs')

//GET route that retrieves all the notes 
notes.get('/', (req,res) =>
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
)

//POST to submit and save notes
notes.post('/', (req,res) => {
    // Deconstruct items
    const {title,text} = req.body;

    //Check to make sure all properties are present 
    if (title && text) {
        //object that will be saved 
        const newNote = {title, text};

        //append object to the database 
        readAndAppend(newNote, '../db/db.json')

        //object holding, status and note content
        const response = {
            status: 'success',
            body: newNote
        };

        res.json(response);
    }
    else {
        res.json('Error in posting feedback')
    }
});

module.exports = notes;