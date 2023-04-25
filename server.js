const express = require('express');
const app = express();
const fs = require('fs');
const htmlRoute = require('./routes/index.js');


const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.static('public'));

//req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use("/", htmlRoute);


app.listen(PORT, () => console.log(`Server listening on PORT http://localhost:${PORT}`));
