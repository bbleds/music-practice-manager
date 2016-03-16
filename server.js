"use strict";

// ------------- dependencies
const express = require("express");
const app = express();
const path =  require("path");
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// developed dependencies
const knex = require("./knexConfig.js");
const routes = require("./routes");


// -------------  envrionemt variables
const PORT = process.env.PORT || 3001;
const SESSION_SECRET = process.env.SESSION_SECRET || "secret";


// ------------- Middleware
// redis session config
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore()
}));
// body parser config
app.use(bodyParser.urlencoded({extended: false}));

//use public directory for static files
app.use(express.static(path.join(__dirname, '/public')));


// ---------------------- Routes
app.use(routes);

// spin up app
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
