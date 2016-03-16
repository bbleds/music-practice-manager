"use strict";

const passport = require("passport");
const knex = require("../knexConfig.js");
const bcrypt = require("bcrypt");
const BCRYPT_DIFFICULTY = 10;

// passport file
require("../passportConfig");

const exportObject = {};

// compare passwords and login user
exportObject.loginUser = passport.authenticate('local',
  { successRedirect: '/main',
    failureRedirect: '/'
  });


module.exports = exportObject;
