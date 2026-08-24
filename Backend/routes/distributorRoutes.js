const express = require("express");
const router = express.Router();
const { sendDistributorEmail } = require("../controllers/distributorController");

router.post("/", sendDistributorEmail);

module.exports = router;