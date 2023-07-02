const express = require('express');
const path = require('path')

// Import our modular routers for /notes
const notesRouter = require('./notes.js');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;