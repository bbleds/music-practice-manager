"use strict";

const knex = require("../knexConfig.js");

const exportObject = {};

exportObject.getUserData = (req, res) => {
  knex.select().table("users").then((data) => {
    res.send(data);
  });
};

exportObject.addOrganization = (req, res) => {
  console.log(req.body);
  // add new organization into db with name entered from frontend
  // add logged in users id to organization in db
  console.log("userrrr");
  knex("organizations").insert({"name": `${req.body.orgName}`, "user_id": `${req.session.passport.user.userId}`, "orgabbrev": `${req.body.orgAbrev}`})
  .then((data) => {
    console.log(data);
  })
  .catch((err)=>{
    console.log(err);
  });

};


module.exports = exportObject;
