"use strict";

const knex = require("../knexConfig.js");
const _ = require("lodash");


const exportObject = {};

exportObject.getUserData = (req, res) => {
  knex.select().table("users").then((data) => {
    res.send(data);
  });
};

exportObject.addOrganization = (req, res) => {
  // get data from db, if organization abbreviation already exists, send error message to user
  knex.select("orgabbrev ").table("organizations")
  .then((data) => {
    console.log(data);
    if(_.filter(data, {"orgabbrev": `${req.body.orgAbrev}`}).length < 1){
      knex("organizations").insert({"name": `${req.body.orgName}`, "user_id": `${req.session.passport.user.userId}`, "orgabbrev": `${req.body.orgAbrev}`})
      .then((data) => {
        console.log(data);
      })
      .catch((err)=>{
        console.log(err);
      });
    } else {
      console.log("nope");
      res.send("This already exists")
    }

  });

};


module.exports = exportObject;
