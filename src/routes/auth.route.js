const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controller/auth.controller');
const { multerMiddleware } = require('../middlewares/multer');
const authRouter = express.Router();

authRouter.post('/register',multerMiddleware.single('image'),registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/logout',logoutUser)

module.exports = {authRouter}