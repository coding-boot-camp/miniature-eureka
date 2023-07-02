///import express and path libraries 
const { clog } = require('./middleware/clog')
const express = require('express')
const path = require('path')
const api = require('./routes/notes.js')

//call instance of express 
const app = express();
const PORT = 3001;

//middleware, to parse sent data
//express.json, recognizes data as a JSON object
//express.urlencoded, recognizes data as strings or arrays 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)

//middleware serve static files from the /public folder
app.use(express.static('public'))

// GET Route for homepage 
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for homepage, using WILDCARD as denoted by * 
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);