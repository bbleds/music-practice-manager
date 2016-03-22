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

// add practice and return new practice details to client
exportObject.addPractice = (req, res) => {
  console.log(req.body);
  // save data to db with knex
  knex("events").insert({"title": req.body.practiceTitle,
  "description": req.body.practiceDesc, "user_id": req.session.passport.user.userId,
  "org_id": req.body.orgId})
  .then((data)=>{
    knex("events").select().where({"title": req.body.practiceTitle,
    "description": req.body.practiceDesc, "user_id": req.session.passport.user.userId,
    "org_id": req.body.orgId}).limit(1)
    .then((newData)=>{
      console.log(newData);
      res.send(newData);
    }).catch((err)=>{
      if (err) throw err;
    });
  }).catch((err)=>{
    console.log(err);
  });
};

exportObject.getPractice = (req, res) => {
  console.log(req.params);
  knex("events").select().where({"event_id":parseInt(req.params.eventId), "org_id":parseInt(req.params.orgId)}).limit(1)
  .then((data)=>{
    res.send(data);
  }).catch((err)=>{
    if (err) throw err;
  });
};

exportObject.editPractice = (req, res) => {
  console.log(req.body);
  knex("events").select()
  .where({
    "event_id":req.body.eventId,
    "org_id":req.body.orgId
  })
  .update({
    "title":  req.body.practiceTitle,
    "description": req.body.practiceDesc
  })
  .limit(1)
  .then((data)=>{
    res.send("successful")
  })
  .catch((err)=>{
    if(err)throw err;
  })

};

exportObject.deletePractice = (req,res) =>{

  // const example = JSON.parse(req.headers);
  const delParams = JSON.parse(req.headers.delparams);
  knex("events")
  .where(
    {
      "title": delParams.title,
      "user_id": req.session.passport.user.userId,
      "org_id": delParams.org_id
    }
  )
  .del()
  .limit(1)
  .then((data) => {
    console.log(data);
  }).catch((err)=>{
    console.log(err);
  });
};

exportObject.getSongs = (req,res)=>{
  console.log(req.params);
  knex("songs").select()
  .where({
    "event_id": req.params.eventId
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    if(err) throw err;
  })
};

exportObject.addSong = (req,res)=>{
  console.log(req.body);
  knex("songs")
  .insert({
    "title": req.body.title,
    "link": req.body.link,
    "pdf_ref": req.body.pdf,
    "song_info": req.body.info,
    "event_id": req.body.event_id
  }).limit(1)
  .then((data)=>{
    knex("songs").select()
    .where({
      "title": req.body.title,
      "event_id": req.body.event_id
    })
    .limit(1)
    .then((songData)=>{
      res.send(songData);
    })
    .catch((err)=>{
      if(err) throw err;
    });
  })
  .catch((err)=>{
    if(err) throw err;
  });
};

exportObject.deleteSong = (req,res)=>{
const delParams = JSON.parse(req.headers.delparams);
  knex("songs")
  .where({
    "title":delParams.title,
    "event_id": delParams.event_id,
    "song_id": delParams.song_id
  })
  .del()
  .limit(1)
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    if(err) throw err;
  });
};


module.exports = exportObject;
