//routes to html file and api file
const express = require("express");
const htmlRoutes = require(".routes/htmlRoutes");
const apiRoutes = require(".routes/apiRoutes");

//launch localhost webpage via express
const app = express();
const PORT = process.env.PORT || 3001;

//use npm start
//to start the express server

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

//app usage of links to routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})