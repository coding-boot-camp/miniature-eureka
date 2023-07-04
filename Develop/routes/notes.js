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
const { v4: uuidv4 } = require('uuid');
const { readFile } = require('fs');

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

//DELETE notes based on ids
//app.delete(path, callback, [callback])
//'/api/notes/:id'
notes.delete('/:id', (req,res) => {
    //req.params, contains route parameters
    //IF the parameters are specified when a URL is built, then req.params object will be populated with said URL
    //in this example it's :id 
    //you can chain this if you wanted to pull other parameters ex. '/:id/:text'
    let { id } = req.params;
    //returns the id of the note clicked
    //console.log(id)
    //parse the JSON file and save it as an object for comparison
    var db = JSON.parse(fs.readFileSync('./db/db.json'))
    //console.log(db)
    //for..in, the obj 
    //note represents the index basically
    for(const note in db) {
        //IF id matches the id of the object at the specific index
        if(id == db[note].id) {
            //remove the object in the array at that index
            db.splice([note], 1)
            //write the information back to the original JSON to update it 
            //stringify parameters, are replacer and spacing 
            fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 4))
            //a response needs to be passed back or else the promise will pend forever 
            //if successful
            res.json('Note delete successful.')
        } else {
            //if fail 
            res.json('Note delete failed.')
        }
    }
});

module.exports = notes;