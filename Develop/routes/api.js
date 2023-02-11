const express = require("express");
const uuid = require("uuid");
const fs = require("fs");

const api = express.Router();

api.post("/notes", (req, res) => {
  //
  if (req.body) {
    console.log(req.body);
    // deconstruct
    const title = req.body.title;
    const text = req.body.text;
    const id = uuid.v4();

    const note = {
      title,
      text,
      id,
    };
    // read the file, covert to json, add to list, then save
    const fileString = fs.readFileSync("./db/db.json");
    const fileJson = JSON.parse(fileString);
    fileJson.push(note);
    fs.writeFileSync("./db/db.json", JSON.stringify(fileJson));
    res.send(note);
  }
});

api.get("/notes", (req, res) => {
  const db = fs.readFileSync("db/db.json");
  res.send(JSON.parse(db));
});

api.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const fileString = fs.readFileSync("./db/db.json");
  const fileJson = JSON.parse(fileString);
  // findIndex function that iterates through every note and runs function we give it
  const index = fileJson.findIndex((note) => note.id === noteId);
  console.log(index);

  fileJson.splice(index, 1);
  // save that array to the filesystem
  fs.writeFileSync("./db/db.json", JSON.stringify(fileJson));
  // respond to the delete request
  res.json(`Item ${noteId} has been deleted`);
});

module.exports = api;
