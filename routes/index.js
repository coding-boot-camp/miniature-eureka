const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./apiRoutes/index.js');


router.use('/api/notes', apiRoutes);
// router.get('/api/notes', function(req,res) {
//     res.send(JSON.parse("Heres a thing"));
// })
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})
router.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

module.exports = router;