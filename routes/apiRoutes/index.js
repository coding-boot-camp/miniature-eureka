const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const noteData = require('../../db/db.json');
const uuid = require('uuid');

const readFromFile = util.promisify(fs.readFile);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(content);
            writetoFile(file, parsedData);
        }
    })
}

const writetoFile = (file, content) => {
    fs.writeFile(file, JSON.stringify(content, null, 4), (err) => 
        err ? console.log(err) : console.log(`Data written to ${file}!`)
    )
}


router.get('/', function(req, res) {
    readFromFile('./db/db.json').then((data) => res.send(data));
});

router.delete('/:id', function(req, res) {
    const {id} = req.params.id;
});

router.post('/', function(req, res) {
    const {title, text} = req.body;

    if(text && title) {
        const newNote = {
            title,
            text,
            id: uuid.v4()
        }

        readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
    } else {
        res.json('Error in posting feedback');
    }
})

module.exports = router;