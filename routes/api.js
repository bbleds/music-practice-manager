'use strict';

const express = require('express');
const router = express.Router();
const apiCtrl = require("../controllers/api");

// ----------- Api Endpoints
router.get("/api/users", apiCtrl.getUserData);
router.get("/api/organization", apiCtrl.getUserOrgs);
router.get("/api/organization/:orgAbbrev", apiCtrl.getNonUserOrgs);
router.post("/api/organization", apiCtrl.addOrganization);
router.delete("/api/organization", apiCtrl.deleteOrganization);
router.get("/api/:orgId/practice", apiCtrl.getOrgEvents);
router.post("/api/practice", apiCtrl.addPractice);
router.get("/api/song/:eventId", apiCtrl.getSongs);
router.post("/api/song", apiCtrl.addSong);
router.put("/api/song", apiCtrl.updateSong);
router.delete("/api/song", apiCtrl.deleteSong);
router.get("/api/:orgId/practice/:eventId", apiCtrl.getPractice);
router.post("/api/:orgId/practice/:eventId", apiCtrl.editPractice);
router.delete("/api/practice", apiCtrl.deletePractice);


module.exports = router;
