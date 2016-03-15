"use strict";

const knex = require("../knexConfig.js");

const exportObject = {};

exportObject.getUserData = (req, res) => {
  knex.select().table("users").then((data) => {
    res.send(data);
  });
};


module.exports = exportObject;
