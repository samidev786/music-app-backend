const { albumModel } = require("../models/album.model");
const { musicModel } = require("../models/music.model");
const { uploadToCloudinary } = require("../utils/cloud.upload");

exports.createMusic = async(req,res)=>{
if(!req.user || req.user.role !== 'artist'){
    return res.status(403).json({
        message:"unauthorize access"
    })
}
const title = req.body?.title;
const uri = await uploadToCloudinary(req.file);
console.log('uri',uri)
await musicModel.create({
    title,uri,artist:req.user._id
})
res.status(201).json({
    message:"music created successfully!",
    data:{title,uri,artist:req.user._id}
})
}


exports.createAlbum = async(req,res)=>{
if(!req.user || req.user.role !== 'artist'){
    return res.status(403).json({
        message:"unauthorize access"
    })
}
const title = req.body?.title;
const musicIds = req.body?.musicIds;
await albumModel.create({
    title,artist:req.user._id,musicIds
})
res.status(201).json({
    message:"music created successfully!",
    data:{title,musicIds,artist:req.user._id}
})
}

exports.fetchMusics = async(req,res)=> {
    const musics = await musicModel.find({})
    .skip(2)
    .limit(1)
    .populate('artist','username email');
    return res.status(200).json({
        message:"music fetched successfully!",
        data:musics
    })
}

exports.fetchAlbums = async(req,res)=> {
    const albums = await albumModel.find({}).populate('artist','username email')
    .populate('musicIds');
    return res.status(200).json({
        message:"music fetched successfully!",
        data:albums
    })
}
exports.getAlbumById = async(req,res) => {
let {id} = req.params;
const album = await albumModel.findOne({_id:id}).populate('musics');
return res.status(200).json({
    message:"album fetched successfully!",
    data:album
})
}
