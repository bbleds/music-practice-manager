'use strict';
//default route
const express = require('express');
const router = express.Router();
const path = require('path');

// index route
router.get("/", (req, res) =>{
  res.sendFile(path.resolve('public/html/index.html'));
});

// main back-end after login
router.get("/main", (req, res) =>{
  res.sendFile(path.resolve('public/html/main-backend.html'));
});

// Api endpoints
router.use(require("./api"));


module.exports = router;
