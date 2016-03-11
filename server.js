"use strict";

// ------------- dependencies
const express = require("express");
const app = express();

// -------------  envrionemt variables
const PORT = process.env.PORT || 3000;


// spin up app
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
