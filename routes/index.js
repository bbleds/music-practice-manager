'use strict';
//default route
const express = require('express');
const router = express.Router();
const path = require('path');

// index route
router.get("/", (req, res) =>{
  if(req.session.passport){
    console.log(req.session.passport);
    res.redirect("/main");
  } else {
    console.log("no passport exists");
    res.sendFile(path.resolve('public/html/index.html'));
  }
});
// main back-end after login
router.get("/main", (req, res) =>{
  if(req.session.passport){
    res.sendFile(path.resolve('public/html/main-backend.html'));
  } else {
    res.redirect("/");
  }
});

// Api endpoints
router.use(require("./api"));
// login and register
router.use(require("./auth"));
// non user view
router.get("/organization/:abbrev", (req, res)=>{
  res.sendFile(path.resolve('public/html/non-user.html'));
})

// Catch all
router.get("/*", (req, res)=>{
  if(req.session.passport){
    res.sendFile(path.resolve('public/html/main-backend.html'));
  } else {
    res.redirect("/");
  }
});


module.exports = router;
