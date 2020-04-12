const multer = require('multer');
const path = require("path");

const {
  ensureAuthenticated
} = require('../../config/auth');

module.exports = function(values){
  const storage = values.storage;
  const gfs = values.gfs;
  
  return multer({ storage:storage,
                  limits:{
                  fileSize:150000,
                  },
                  fileFilter: function (req, file, cb) {
                      if (path.extname(file.originalname) === '.jpg' || path.extname(file.originalname) === '.png' || path.extname(file.originalname) === '.webp' || path.extname(file.originalname) === '.tif') {
                        // return cb(new Error('Only jpg files are allowed'))
                        // if (fs.existsSync(path.join('facilityImages/',file.originalname))) {
                        //   console.log('Image with same name already exists in databse.Upload with different name');
                        //   return cb(new Error('Image with same name already exists in databse.Upload with different name'));
                        //   }
                        //   else{
                        //     cb(null, true);
                        //   }

                        gfs.files.findOne({filename: file.originalname}).then(image =>{
                          //check if images
                          if(!image || image.length === 0)
                          {
                              cb(null, true);
                          }
                          else{
                            return cb(new Error('Image with same name already exists in databse.Upload with different name'));
                          }
                        }).catch(err =>{
                          console.error(err);
                          console.log(err);
                        });


                      }
                      // else if(fs.existsSync(path.join(facilityImages,file.originalname))) {
                      //   // cb(null, file.originalname+"(1)")
                      //   console.log('Image with same name already exists in databse.Upload with different name');
                      //   return cb(new Error('Image with same name already exists in databse.Upload with different name'));
                      // }
                      else{
                        return cb(new Error('Only jpg/png/webp/tif file formats are allowed'))
                      }
                      // cb(null, true)
                    },
                  });
}
