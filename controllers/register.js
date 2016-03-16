"use strict";

// dependencies
const knex = require("../knexConfig.js");
const bcrypt = require("bcrypt");
const BCRYPT_DIFFICULTY = 10;

const exportObject = {};

exportObject.registerUser = (req, res) => {
  // encrypt password
  // store in db
  // then send back sucess message
  bcrypt.hash(req.body.registerPassword, BCRYPT_DIFFICULTY, (err, hash) => {
      if (err) throw err;
      knex("users").insert({email: `${req.body.registerEmail}`, firstname: `${req.body.registerFirstName}`, lastname: `${req.body.registerLastName}`, password: hash})
      .then((data) => {
        console.log("success");
        console.log(data);
      });
  });

  const responseObject = {
    "status": "Registration successful, please log in.",
    "email": req.body.registerEmail
  };
  res.send(responseObject);
};


module.exports = exportObject;
