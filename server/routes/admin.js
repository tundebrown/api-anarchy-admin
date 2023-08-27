const express = require("express");
const {
  getAdmins,
} = require("../controllers/admin.js");

const router = express.Router();

router.get("/admin", getAdmins);


module.exports = router;
