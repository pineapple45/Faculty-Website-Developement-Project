const GridFsStorage = require('multer-gridfs-storage');
const path = require("path");

const {
  ensureAuthenticated
} = require('../../config/auth');

// DB Config
const db = require('../../config/keys').MongoURI;

module.exports = function(collectionName){
  return new GridFsStorage({
    url: db,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
                const fileInfo = {
                  filename: file.fieldname + '-' + Date.now() + path.extname(file.originalname),
                  bucketName: collectionName
                };
                resolve(fileInfo);
      });
    }
  });
}
