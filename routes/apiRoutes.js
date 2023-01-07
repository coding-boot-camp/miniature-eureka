const fs = require(`fs`)

// create api route
const router = require(`express`).Router();
// const path = require(`path`);
const storage = require("../db/storage");

router.get(`/notes`, (req,res) => {
    // what kind of thing do you want to send
    storage.getNotes()
    .then()
    

})

router.post(`/notes`, (req,res) => {
    // take in whats in the note
    // send to the db.json
    // in json format
    storage.addNote(req.body)
    .then((newNote) => res.json(newNote))
})

module.exports = router;