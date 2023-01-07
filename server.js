const express = require('express');
const htmlRoutes = require(`./routes/htmlRoutes`)
const apiRoutes = require(`./routes/apiRoutes`)
const path = require(`path`)
// Helper method for generating unique ids

// give me an available port, if not use 3001
const PORT = process.env.PORT || 3001;

const app = express();

// add middlewear to the application (app.use)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// dynamic vs static (what folder are we using). static: files that don't change dynamic: files that can change
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use(`/`, htmlRoutes)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
