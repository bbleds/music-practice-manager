"use strict";

const knex = require("../knexConfig.js");

const exportObject = {};

exportObject.loginUser = (req, res) => {
  res.send("should now login");
};


module.exports = exportObject;
