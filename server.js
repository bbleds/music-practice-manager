"use strict";

// ------------- dependencies
const express = require("express");
const app = express();
const path =  require("path");
const knex = require("./knexConfig.js");


knex.select().table('users').then((data)=> {
  console.log("weeel then ");
  console.log(data);
});

// -------------  envrionemt variables
const PORT = process.env.PORT || 3000;


//use public directory for static files
app.use(express.static(path.join(__dirname, '/public')));

// ---------------------- Routes
// index route
app.get("/", (req, res) =>{
  res.sendFile('public/html/index.html' , { root : __dirname});
});
// main back-end after login
app.get("/main", (req, res) =>{
  res.sendFile('public/html/main-backend.html' , { root : __dirname});
});


// spin up app
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
