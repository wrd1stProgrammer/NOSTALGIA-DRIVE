const express = require('express');
const authMiddleware = require("../middlewares/authentication");
const authRouter = require("../routes/auth");
const userRouter = require("../routes/user");
const auth = require('../middlewares/authentication');
const fileRouter = require("../routes/file");
const geminiRouter = require("../routes/gemini");


module.exports = async (app) => {
    const router = express.Router();

    // 기본 경로
    router.get('/', (req, res) => {
        res.send('Hello, World!');
    });

    
    app.use("/auth",authRouter);
    app.use("/user",authMiddleware,userRouter);
    app.use("/file",authMiddleware,fileRouter);
    app.use("/gemini",authMiddleware,geminiRouter);

    

    console.log('라우트 OK');
};
