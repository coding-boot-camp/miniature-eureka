const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes/index.js');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);
// GET Route for homepage

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} :rocket:`)
);