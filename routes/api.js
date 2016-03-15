'use strict';
//default route
const express = require('express');
const router = express.Router();
const knex = require("../knexConfig.js");

// ----------- Api Endpoints
router.get("/api/users", (req, res)=>{
  knex.select().table("users").then((data) => {
    res.send(data);
  });
});


module.exports = router;
