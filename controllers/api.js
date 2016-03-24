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

exportObject.getNonUserOrgs = (req, res) => {
  const organizationDetails ={};

  console.log(req.params.orgAbbrev);
  // get organization details
  knex("organizations").select()
  .where({
    "orgabbrev": req.params.orgAbbrev
  })
  .limit(1)
  .then((data)=>{
    // set organization information to send
    organizationDetails.orgDetails = data[0];

    // Send all practices for organization
    knex("events").select()
    .where({
      "org_id": organizationDetails.orgDetails.organization_id
    })
    .then((practices)=>{
      // set practices key for organization
      organizationDetails.practices = practices;
      res.send(organizationDetails)
    });

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

exportObject.deleteOrganization = (req,res) => {
  const orgData = JSON.parse(req.headers.delparams);
  // get all events matching selected organization
  knex("events")
  .select()
  .where({
    "org_id": orgData.organization_id,
    "user_id": req.session.passport.user.userId
  })
  .then((data)=>{
    // handle other cases in an else
    if(data.length > 0){
      const eventId = data[0].event_id;
      const orgId = data[0].org_id;
      // delete songs associated with events
      knex("songs").where({
        "event_id": eventId
      })
      .del()
      .then(()=>{
        // delete events associated with organization
        knex("events").where({
          "org_id": orgId
        })
        .del()
        .then(()=>{
          // delete organization
          knex("organizations").where({
            "organization_id": orgId
          })
          .del()
          .then(()=>{
            res.send({"status":"success"})
          })
          .catch((err)=>{
          if (err) throw err;
        });
        })
        .catch((err)=>{
          if (err) throw err;
        });
      })
      .catch((err)=>{
        if (err) throw err;
      });

    } else {
      knex("organizations").where({
        "organization_id": orgData.organization_id
      })
      .del()
      .then(()=>{
        res.send({"status":"success"})
      })
      .catch((err)=>{
      if (err) throw err;
    });
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
  const delparams = JSON.parse(req.headers.delparams);
  // delete songs associated with practices
  knex("songs")
  .where({
    "event_id": delparams.event_id
  })
  .del()
  .then(()=>{
    // delete practice
    knex("events")
    .where({
      "event_id": delparams.event_id,
      "user_id": req.session.passport.user.userId
    })
    .del()
    .then(()=>{
      res.send({"status":"successful"})
    })
    .catch((err)=>{
      if (err) throw err;
    })
  })
  .catch((err)=>{
    if(err) throw err;
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
exportObject.updateSong = (req,res)=>{
  console.log(req.body);
  knex("songs").select()
  .where({
    "song_id": req.body.song_id,
    "event_id": req.body.event_id
  })
  .update({
    "title": req.body.title,
    "link": req.body.link,
    "pdf_ref": req.body.pdf,
    "song_info": req.body.info
  })
  .limit(1)
  .then((data)=>{
    console.log("successful");
    res.send(data);
  })
  .catch((err)=>{
    if(err) throw err;
  });
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
