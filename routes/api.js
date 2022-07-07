const app = require('express').Router();
const fs = require('fs');
let notes = require('../db/db.json');
// GET Route for retrieving all the notes = /api/notes/
app.get('/notes', (req, res) => {
  notes = JSON.parse(fs.readFileSync("/db/db.json", "utf8"));
  res.json(notes)
});


app.post('/notes', (req, res) => {
  const newNote = {
    id: Math.floor(Math.random() * 1000),
    tile:req.body.tile,
    text:req.body.text
  }
  notes.push(newNote)
  fs.writeFileSync("/db/db.json",JSON.stringify(notes), "utf8",function(err){
    if(err) throw err;
  });
  res.json(notes)
});

app.delete('/notes/:id', (req, res) => {
  let notGone = notes.filter(note => note.id != req.params.id)
  notes = notGone;
  fs.writeFileSync("/db/db.json",JSON.stringify(notes), "utf8",function(err){
    if(err) throw err;
  });
  res.json(notes)
});

module.exports = app;


 