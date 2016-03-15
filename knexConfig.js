"use strict";

// require and configure knex
const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost:5432/MPM'
});

module.exports = knex;
