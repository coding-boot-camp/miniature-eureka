const express = require("express");

//routes to html file and api file
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//launch localhost webpage via express
const app = express();
const PORT = process.env.PORT || 3001;

//are these required for my usecase?
// const path = require('path');
// const fs = require('fs');

//use npm start
//to start the express server

//parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

//app usage of links to routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//app telling users the server is running
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})