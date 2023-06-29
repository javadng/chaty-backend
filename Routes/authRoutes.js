const express = require("express");
const { setCookie } = require("../Controllers/authController");
const router = express.Router();

router.post("/set-cookie", setCookie);

module.exports = router;
