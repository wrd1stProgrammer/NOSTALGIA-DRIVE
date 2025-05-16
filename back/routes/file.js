const express = require("express");
const upload = require("../config/multer");


const { uploadMedia } = require(".././controllers/file/upload");


const router = express.Router();


router.post("/upload", upload.single("image"), uploadMedia);

module.exports = router;