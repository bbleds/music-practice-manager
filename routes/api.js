'use strict';

const express = require('express');
const router = express.Router();
const apiCtrl = require("../controllers/api");

// ----------- Api Endpoints
router.get("/api/users", apiCtrl.getUserData);
router.get("/api/organization", apiCtrl.getUserOrgs)
router.post("/api/organization", apiCtrl.addOrganization);


module.exports = router;
