'use strict';

const express = require('express');
const router = express.Router();
const loginCtrl = require("../controllers/login");
const registerCtrl = require("../controllers/register");

router.post("/login", loginCtrl.loginUser);
router.post("/register", registerCtrl.registerUser);

module.exports = router;
