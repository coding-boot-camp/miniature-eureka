const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

function createNote(body, notesArray) {
  const note = body;
  let note_id = uniqid();
  note.id = note_id;
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function updateNote(body, notesArray) {
  const note = body;
  let index = findNote(note.id, notesArray);
  notesArray[index].title = note.title;
  notesArray[index].text = note.text;

  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function findNote(noteId, notesArray) {
  const result = notesArray.findIndex(note => note.id == noteId);
  return result;
}

function deleteNote(noteId, notesArray) {
  let index = findNote(noteId, notesArray);
  notesArray.splice(index,1);
  
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return noteId;
}


module.exports = {
  createNote,
  updateNote,
  findNote,
  deleteNote
};
