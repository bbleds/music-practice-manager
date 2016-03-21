'use strict';

const express = require('express');
const router = express.Router();
const apiCtrl = require("../controllers/api");

// ----------- Api Endpoints
router.get("/api/users", apiCtrl.getUserData);
router.get("/api/organization", apiCtrl.getUserOrgs);
router.post("/api/organization", apiCtrl.addOrganization);
router.get("/api/:orgId/practice", apiCtrl.getOrgEvents);
router.post("/api/practice", apiCtrl.addPractice);
router.get("/api/:orgId/practice/:eventId", apiCtrl.getPractice);
router.delete("/api/practice", apiCtrl.deletePractice);


module.exports = router;
