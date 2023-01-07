const util = require('util');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

const readFromFile = util.promisify(fs.readFile);
const readAndAppend = util.promisify(fs.writeFile);

class Storage {
  read() {
    return readFromFile('db/db.json', 'utf8');
  }

  write(note) {
    return readAndAppend('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read()
    .then((note) => {
      let parsedNotes;

    //   made an array for notes. If there isn't one, one will be made.
      try {
        parsedNotes = [].concat(JSON.parse(note));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // unique id will be added using the uuid package
    const newNote = { title, text, id: uuidv4() };
    console.log(newNote)
    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
      
  }

//   removeNote(id) {
//     // Get all notes, remove the note with the given id, write the filtered notes
//     return this.getNotes()
//       .then((notes) => notes.filter((note) => note.id !== id))
//       .then((filteredNotes) => this.write(filteredNotes));
//   }
}

module.exports = new Storage();
