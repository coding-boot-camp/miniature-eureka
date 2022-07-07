const htmlPath = require('express').Router();
const path = require('path');

htmlPath.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);
htmlPath.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);


module.exports = htmlPath;