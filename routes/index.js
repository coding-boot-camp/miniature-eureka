const app = require('express').Router()
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlroutes.js');
app.use(htmlRoutes);
app.use("/api",apiRoutes)
module.exports = app;
