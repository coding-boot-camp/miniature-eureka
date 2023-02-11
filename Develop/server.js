const express = require("express");
const path = require("path");
const api = require("./routes/api");
const fs = require("fs");
const util = require("util");

// const router = express.Router();

const PORT = process.env.port || 3001;
const app = express();

// // Middleware for parsing JSON and urlencoded form data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", api);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Post route to add note

// app.get('/api/notes' (req, res) =>
// )

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT})`)
);
