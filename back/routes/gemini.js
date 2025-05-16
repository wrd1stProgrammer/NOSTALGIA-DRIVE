const express = require("express");
const {
    
  geminai
} = require("../controllers/gemini/gemini");

const router = express.Router();

router.post("/geminitest", geminai);



module.exports = router;