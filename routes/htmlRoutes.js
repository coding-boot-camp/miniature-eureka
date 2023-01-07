const { appendFile } = require("fs");

// create html route
const router = require(`express`).Router();
const path = require(`path`)

router.get(`/notes`, (req,res) => {
    // what kind of thing do you want to send
    res.sendFile(path.join(__dirname, `../public/notes.html`))
})

router.get(`/` , (req,res) => {
    res.sendFile(path.join(__dirname, `../public/index.html`))
})

module.exports = router;