"use strict";

// dependencies
const knex = require("../knexConfig.js");
const bcrypt = require("bcrypt");
const BCRYPT_DIFFICULTY = 10;

const exportObject = {};

// store user in db and encrypt password
exportObject.registerUser = (req, res) => {
  const errorMessage = {
    "status": "There was an error with your registration. This email may exist or there may have been an error with your request, please try again!"
  }

  bcrypt.hash(req.body.registerPassword, BCRYPT_DIFFICULTY, (err, hash) => {
      if (err){
        res.send(errorMessage);
      } else {
        knex("users").insert({email: `${req.body.registerEmail}`, firstname: `${req.body.registerFirstName}`, lastname: `${req.body.registerLastName}`, password: hash})
        .then((data) => {
          const responseObject = {
            "status": "Registration successful, please log in.",
            "email": req.body.registerEmail
          };
          res.send(responseObject);
        }).catch((err)=>{
          res.send(errorMessage);
        });

      }
  });
};


module.exports = exportObject;
