const express = require('express');
const {connectDB} = require('./db/db')
const app = express();
const cors = require('cors');
const { mainRouter } = require('./routes/main.route');
const cookieParser = require('cookie-parser')
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use('/api',mainRouter)

module.exports = app;