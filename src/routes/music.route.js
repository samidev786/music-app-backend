const express = require('express');
const { uploadToCloudinary } = require('../utils/cloud.upload');
const { createMusic, createAlbum, fetchMusics, fetchAlbums, getAlbumById } = require('../controller/music.controller');
const { multerMiddleware } = require('../middlewares/multer');
const musicRouter = express.Router();


musicRouter.post('/create',multerMiddleware.single('music'),createMusic)
musicRouter.post('/album/create',createAlbum);
musicRouter.get('/',fetchMusics)
musicRouter.get('/albums',fetchAlbums)
musicRouter.get('/album/:id',getAlbumById)

module.exports = {musicRouter}