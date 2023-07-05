///import libraries
//clog custom middleware 
const { clog } = require('./middleware/clog')
//express
const express = require('express')
//path library
const path = require('path')
//fs library 
const fs =  require('fs')
//import rest api
const api = require('./routes/index.js')

//call instance of express 
const app = express();
const PORT = process.env.PORT || 3001;

//Import custom middleware,clog
app.use(clog)
//middleware, to parse sent data
//express.json, recognizes data as a JSON object
//express.urlencoded, recognizes data as strings or arrays 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//create instance of rest api 
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