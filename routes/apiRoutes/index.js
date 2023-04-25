const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const noteData = require('../../db/db.json');
// const {somethingName, postNotes} = require("../../controller/noteController.js");

const readFromFile = util.promisify(fs.readFile);


router.get('/', function(req, res) {
    res.send(noteData);
});
// router.post(postNotes)

// router.get('/', function (req, res) {
//     res.send(JSON.parse("Heres a thing"));

// })
module.exports = router;