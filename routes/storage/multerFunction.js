const multer = require('multer');
const path = require("path");

const {
  ensureAuthenticated
} = require('../../config/auth');

module.exports = function(storage){
  return multer({
                storage:storage,
                limits:{
                fileSize:125000,
                files:12,
              },
                fileFilter: function (req, file, cb) {
                    if (path.extname(file.originalname) === '.jpg' || path.extname(file.originalname) === '.png' || path.extname(file.originalname) === '.webp' || path.extname(file.originalname) === '.tif') {
                      // return cb(new Error('Only jpg files are allowed'))
                      cb(null, true)
                    }
                    else{
                      return cb(new Error('Only jpg/png/webp/tif file formats are allowed'))
                    }
                    // cb(null, true)
                  },
               });
}
