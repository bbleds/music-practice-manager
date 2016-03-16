"use strict";

const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const knex = require("./knexConfig.js");
const bcrypt = require("bcrypt");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  console.log("inside deserializeUser");
});

passport.use("local", new LocalStrategy({
  usernameField: 'loginEmail',
  passwordField: 'loginPassword',
  passReqToCallback: true
}, (req, email, password, done) => {
  knex('users').select('password','_id').limit(1).where('email', req.body.loginEmail)
  .then((data) => {

        bcrypt.compare(req.body.loginPassword, data[0].password, (err, valid)=>{
          if (err) throw err;
          // if login is valid
          if(valid){
            return done(null, {"userId" : data[0]._id});
          } else {
            return done(null, false);
          }


        });
      });
}));
