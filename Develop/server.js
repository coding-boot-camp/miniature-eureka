const express = require("express");
const path = require("path");
const api = require("/index.js");

const PORT = process.eventNames.prot || 3001;
const app = express();

api.get("/public/assets/notes", (req, resp) =>
  resp.sendFile(path.join(__dirname, "public/assets/index.html"))
);
