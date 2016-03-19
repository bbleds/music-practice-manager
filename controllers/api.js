"use strict";

const knex = require("../knexConfig.js");
const _ = require("lodash");


const exportObject = {};

exportObject.getUserData = (req, res) => {
  knex.select().table("users").then((data) => {
    res.send(data);
  });
};

exportObject.getUserOrgs = (req, res) => {
  knex.select().table("organizations").where({user_id: `${req.session.passport.user.userId}`}).then((data) => {
    res.send(data);
  });
};

exportObject.getOrgEvents = (req, res) => {
  knex.select().table("events").where({user_id: req.session.passport.user.userId, org_id: req.params.orgId}).then((data) => {
    res.send(data);
  });
};

exportObject.addOrganization = (req, res) => {
  // get data from db, if organization abbreviation already exists, send error message to user
  knex.select("orgabbrev", "name").table("organizations")
  .then((data) => {
    console.log(data);
    if(_.filter(data, {"orgabbrev": `${req.body.orgAbrev}`}).length < 1 && _.filter(data, {"name": `${req.body.orgName}`}).length < 1){
      knex("organizations").insert({"name": `${req.body.orgName}`, "user_id": `${req.session.passport.user.userId}`,
      "orgabbrev": `${req.body.orgAbrev}`, "orgdesc": `${req.body.orgDesc}`})
      .then((data) => {
        res.send(data);
      })
      .catch((err)=>{
        console.log(err);
      });
    } else {
      console.log("nope");
      res.send("This already exists");
    }
  });
};

exportObject.addPractice = (req, res) => {
  console.log(req.body);
  // save data to db with knex
  knex("events").insert({"title": req.body.practiceTitle,
  "description": req.body.practiceDesc, "user_id": req.session.passport.user.userId,
  "org_id": req.body.orgId})
  .then((data)=>{
    console.log(data);
    res.send(data);
  }).catch((err)=>{
    console.log(err);
  });
};


module.exports = exportObject;
