"use strict";

// ------------- dependencies
const express = require("express");
const app = express();
const path =  require("path");
const knex = require("./knexConfig.js");
const routes = require("./routes");


// -------------  envrionemt variables
const PORT = process.env.PORT || 3000;


//use public directory for static files
app.use(express.static(path.join(__dirname, '/public')));

// ---------------------- Routes
app.use(routes);




// spin up app
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
