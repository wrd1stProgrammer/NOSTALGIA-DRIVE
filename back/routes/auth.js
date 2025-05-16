const express = require("express");
const {
    refreshToken,
    registerApi,
    loginApi,
} = require("../controllers/auth/auth");
const router = express.Router();

router.post("/refreshToken", refreshToken);
router.post("/register",registerApi);
router.post("/login", loginApi);



module.exports = router;



