const multer = require('multer');

// multer.diskStorage // to store real file in a server
// multer.memoryStorage //get buffer to directly upload on code 

const storage = multer.memoryStorage();
exports.multerMiddleware = multer({storage});