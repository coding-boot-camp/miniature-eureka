const router = require("express").Router();

//uuid package creates unique id for each note saved with the note taker
const { v4: uuidv4 } = require("uuid");
//fs gives access to the file system to alter the json object in /db
const fs = require("fs");

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get("/notes", (req, res) => {
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  return res.json(notes);
});

// POST /api/notes gets new note to save on request, then add it to
// db.json, and return the display note to the client.
router.post("/notes", (req, res) => {
  let noteNew = req.body;
  //new note is posted with a respective id with the uuid package from npm
  noteNew.id = uuidv4();
  //reading saved notes into object
  let notesObject = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  //pushing new note into object
  notesObject.push(noteNew);
  //pushing new object to json object
  fs.writeFileSync("./db/db.json", JSON.stringify(notesObject));
  //returning the new object
  return res.json(notesObject);
});

// add the DELETE route to the application - DELETE /api/notes/:id
//get an argument that is the ID for the note to be deleted
//read the notes from db.json and load into an object
//delete note with that ID from the object
//update the db.json file with the new object

router.delete("/notes/:id", (req, res) => {
    //gets id of note to delete
  let deleteNote = req.params.id;
  //loads notes from json into an array
  let notesToDelete = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  //finds note with selected ID, for deletion
  let deleteThisNote = notesToDelete.filter((file) => file.id !== deleteNote);
  //update json file with new object without the deleted note
  fs.writeFileSync("./db/db.json", JSON.stringify(deleteThisNote));
//return new object without the the deleted note
  return res.json(deleteThisNote);
});

module.exports = router;
