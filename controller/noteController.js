// const path = require('path');
// const fs = require('fs');
// const util = require('util');
// const noteData = require('../db/db.json');

// //promise version of fs.readFile
// const readFromFile = util.promisify(fs.readFile);


// const somethingName = (req, res) => {
//     // console.log(noteData); //this console is not populating

//     // readFromFile(noteData).then((data) => res.json(JSON.parse(data)));
//      return res.send(JSON.parse("Heres a thing"));
// }

// const postNotes = (req, res) => {
//     res.send();
// }

// module.exports = {
//     somethingName,
//     postNotes
// }