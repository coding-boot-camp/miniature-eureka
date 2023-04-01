const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

// HTML route for index.html
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

// HTML route for notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// Listen for connections
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);