const express = require('express');
const { authRouter } = require('./auth.route');
const {musicRouter} = require('./music.route');
const { authMiddleware } = require('../middlewares/auth.middleware');
const mainRouter = express.Router();

mainRouter.use('/auth',authRouter);
mainRouter.use('/music',authMiddleware,musicRouter)

module.exports = {mainRouter}