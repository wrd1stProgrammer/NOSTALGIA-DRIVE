const express = require("express");
const {
    getMonthlyRecords,

} = require("../controllers/carbon/carbonController");
const router = express.Router();

router.get('/:year/:month',getMonthlyRecords);



module.exports = router;



