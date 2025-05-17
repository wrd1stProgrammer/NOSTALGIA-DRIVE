const express = require("express");
const {
  analyzeReceipt
} = require("../controllers/gemini/recipt");

const router = express.Router();

router.post("/recipt", analyzeReceipt);



module.exports = router;