//imports
const fs = require("fs");
const path = require("path");
const UUID = require('../helpers/uuid');

//function to create new note to database
function createNewNote(body, notesArray) {
    const note = body;
    // Generate a unique ID for  note
    note.id = UUID();
    notesArray.push(note);
    //write to json file
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )

    return note;
}

//function to delete a note
function deleteNote(notesArray, id) {
    let deleteID = parseInt(id);

    // Find the note to delete based on its ID
    const deleteIndex = notesArray.findIndex((note) => note.id === id);

    if (deleteIndex !== -1) {
        notesArray.splice(deleteIndex, 1);

        // Update the IDs for the notes left
        for (let i = deleteIndex; i < notesArray.length; i++) {
            notesArray[i].id = UUID();
        }
        //write to json file
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify({
                notes: notesArray
            }, null, 2)
        );
    }
}


module.exports = {
    createNewNote,
    deleteNote
};