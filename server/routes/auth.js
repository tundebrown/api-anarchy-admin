const express = require("express");
const {
    registerAdmin,
} = require("../controllers/auth.js");

const router = express.Router();

router.post("/", registerAdmin);


module.exports = router;
