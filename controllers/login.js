"use strict";

const knex = require("../knexConfig.js");

const exportObject = {};

exportObject.loginUser = (req, res) => {
  // get data from db with matching email
  // compare passwords
  // create session if successful
  res.send("should now login");
};


module.exports = exportObject;
