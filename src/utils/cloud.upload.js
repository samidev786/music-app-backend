const {v2:cloudinary} = require('cloudinary')
cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})

exports.uploadToCloudinary = async (file) => {
try{
    console.log('file',file)
const base64 = Buffer.from(file.buffer).toString("base64");
// console.log('buffer',base64)

console.log(file.mimetype)
if(file.mimetype.startsWith('audio')){
    
}
const dataUri =  `data:${file.mimetype};base64,${base64}`;
const {secure_url} = await cloudinary.uploader.upload(dataUri,{
  resource_type: file.mimetype.startsWith('audio') ? 'video' : 'auto',
});
return secure_url;
}catch(err){
// console.log('error in uploading to cloud:',err)
}
}