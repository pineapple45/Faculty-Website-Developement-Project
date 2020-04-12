const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require("path");
const bcrypt = require('bcryptjs');
var fs = require('fs');

const {
  ensureAuthenticated
} = require('../config/auth');


// DB Config
const db = require('../config/keys').MongoURI;

const collectionName = 'facilityImages';

// Init gridfs

function foo() {
  return new Promise((resolve, reject) => {
    conn.once('open', function() {
      let gfs = Grid(conn.db, mongoose.mongo);
      // gfs.collection('researchInterestImages');
      require("./storage/secondgfs")({
        collectionName: collectionName,
        gfs: gfs
      });
      resolve(gfs);
    })
  })
}

let gfs;

//create the storage engine
// const storage = new GridFsStorage({
//   url: db,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//               const fileInfo = {
//                 filename: file.originalname,
//                 bucketName: 'facilityImages'
//               };
//               resolve(fileInfo);
//     });
//   }
// });

//create the storage engine
const storage = require("./storage/secondStorageEngine")(collectionName);

// const uploadFacilityImages = multer({ storage:storage,
//                                       limits:{
//                                       fileSize:150000,
//                                       },
//                                       fileFilter: function (req, file, cb) {
//                                           if (path.extname(file.originalname) === '.jpg' || path.extname(file.originalname) === '.png' || path.extname(file.originalname) === '.webp' || path.extname(file.originalname) === '.tif') {
//                                             // return cb(new Error('Only jpg files are allowed'))
//                                             // if (fs.existsSync(path.join('facilityImages/',file.originalname))) {
//                                             //   console.log('Image with same name already exists in databse.Upload with different name');
//                                             //   return cb(new Error('Image with same name already exists in databse.Upload with different name'));
//                                             //   }
//                                             //   else{
//                                             //     cb(null, true);
//                                             //   }
//
//                                             gfs.files.findOne({filename: file.originalname}).then(image =>{
//                                               //check if images
//                                               if(!image || image.length === 0)
//                                               {
//                                                   cb(null, true);
//                                               }
//                                               else{
//                                                 return cb(new Error('Image with same name already exists in databse.Upload with different name'));
//                                               }
//                                             }).catch(err =>{
//                                               console.error(err);
//                                               console.log(err);
//                                             });
//
//
//                                           }
//                                           // else if(fs.existsSync(path.join(facilityImages,file.originalname))) {
//                                           //   // cb(null, file.originalname+"(1)")
//                                           //   console.log('Image with same name already exists in databse.Upload with different name');
//                                           //   return cb(new Error('Image with same name already exists in databse.Upload with different name'));
//                                           // }
//                                           else{
//                                             return cb(new Error('Only jpg/png/webp/tif file formats are allowed'))
//                                           }
//                                           // cb(null, true)
//                                         },
//                                       });



// foo().then( res => {
//  gfs = res;
//  uploadCardImages = require("./storage/secondMulterFunction")({storage:storage,gfs:gfs});
// });

function getfoo() {
  return new Promise((resolve, reject) => {
    foo().then(res => {
      gfs = res;
      const uploadCardImages = require("./storage/secondMulterFunction")({
        storage: storage,
        gfs: gfs
      });
      resolve({
        uploadCardImages: uploadCardImages,
        gfs: gfs
      });
    });
  })
}

// getfoo().then( res => {
//   uploadCardImages = res;
//   console.log(uploadCardImages);
// })

// const uploadCardImages = require("./storage/secondMulterFunction")({storage:storage,gfs:gfs});


// Init gridfs
// let gfs;
//
// conn.once('open', function () {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('facilityImages');
// })


mongoose.set('useFindAndModify', false);

// let editItemId;
let facilityEditItemName;


// Facility model
const FacilityItem = require('../models/FacilityItem');

// const defaultFacilityItem = new FacilityItem({
//   title: "Default Title",
//   details: "Default Details",
//   image: "Default image details",
//   pos: 0
// });
//
//
//
// io.on('connection', function(socket) {
//   socket.on('facilityCardValues', (data) => {
//     console.log(data);
//     if(data.facilityCardFile === ""){
//       console.log("image feild empty!");
//     }
//     else{
//       FacilityItem.find().then(foundItems => {
//           if (foundItems.length === 0) {
//             FacilityItem.create(defaultFacilityItem).then(()=>{
//               console.log("Default Item Successfully added!");
//             }).catch(err =>{
//               console.error(err);
//               console.log(err);
//             })
//           } else {
//             FacilityItem.countDocuments({}).then(val =>{
//               const newFacilityItem = new FacilityItem({
//                 title: data.facilityCardTitle,
//                 details: data.facilityCardDetails,
//                 image: data.facilityCardFile,
//                 pos: val
//               });
//
//               FacilityItem.create(newFacilityItem).then(() =>{
//                 console.log("New Items Successfully added!");
//               }).catch(err =>{
//                 console.error(err);
//                 console.log(err);
//               });
//             }).catch(err =>{
//               console.error(err);
//               console.log(err);
//             });
//
//           }
//       }).catch(err =>{
//         console.error(err);
//         console.log(err);
//       });
//
//     }
//   });
// });
//
//
// io.on('connection', function(socket){
//   FacilityItem.find((err,items)=>{
//     socket.emit('FacilityCardItems',items);
//   });
// });

require('./addCardDetails')(FacilityItem);


// @route GET /dashboard/facilities
// @desc Loads form

// facilities page
// router.get('/', (req, res) => {
//
//   gfs.files.find().toArray().then(files => {
//     //check if images
//     if (!files || files.length === 0) {
//       res.render('facilities', {
//         files: false
//       });
//     } else {
//       res.render('facilities', {
//         files: files
//       });
//     }
//   }).catch(err => {
//     console.error(err);
//     console.log(err);
//   })
//
//
// });


foo().then(res => {
  gfs = res;
  require('./get/secondgeneric')({
    router: router,
    gfs: gfs,
    renderedPage: 'facilities'
  });
});


// @route POST /dashboard/facilities/uploadFacilityImages
// @desc uploads file to // DB


// const upload = uploadCardImages.single('image');
getfoo().then(res => {
  require("./post/uploadCardImage")({
    Item: FacilityItem,
    uploadCardImages: res.uploadCardImages,
    gfs: res.gfs,
    router: router,
    collectionName: collectionName
  })
})

// router.post('/uploadFacilityImages',(req,res) => {
//       upload(req,res,function (err) {
//         if (err instanceof multer.MulterError) {
//            // A Multer error occurred when uploading.
//            console.log(err);
//            req.flash('error',err.message);
//            res.redirect('back');
//
//          } else if (err) {
//            // An unknown error occurred when uploading.
//            console.log(err);
//            if(err.message === "Only jpg/png/webp/tif file formats are allowed")
//            {
//              req.flash('error',err.message);
//            }
//            else if(err.message === 'Image with same name already exists in database.Upload with different name')
//            {
//              req.flash('error',err.message);
//            }
//            else{
//              req.flash('error','Some Network error appeared! Please try again in some time');
//            }
//            // req.flash('error',err.message);
//            res.redirect('back');
//          }
//          else{
//            gfs.files.find().toArray().then(images => {
//                  //check if images
//                 if(!images || images.length === 0)
//                 {
//                     return res.status(404).json({
//                       err: 'No images found'
//                     });
//                 }
//                 //image exists
//                 req.flash('success_msg',"images added");
//                 res.redirect('back');
//                }).catch(err =>{
//                  console.error(err);
//                  console.log(err);
//                });
//          }
//       })
//
//
// });

// @route GET /dashboard/facilities/getFacilityImages
// @desc displays all files
// router.get('/getCardImages', (req, res) => {
//   gfs.files.find().toArray().then(images => {
//     //check if images
//     if (!images || images.length === 0) {
//       return res.status(404).json({
//         err: 'No images found'
//       });
//     }
//     //image exists
//     res.json(images);
//   }).catch(err => {
//     console.error(err);
//     console.log(err);
//   })
// });

foo().then(res => {
  gfs = res;
  require("./get/getCardImages")({
    gfs: gfs,
    router: router,
  })
});



// @route GET /dashboard/facilities/getFacilityImages/:filename
// @desc displays filename
// router.get('/getCardImages/files/:filename', (req, res) => {
//   gfs.files.findOne({
//     filename: req.params.filename
//   }).then(image => {
//     //check if images
//     if (!image || image.length === 0) {
//       return res.status(404).json({
//         err: 'No image found'
//       });
//     }
//     //image exists
//     res.json(image);
//   }).catch(err => {
//     console.error(err);
//     console.log(err);
//   });
// });

foo().then(res => {
  gfs = res;
  require("./get/getsecondfilename")({
    gfs: gfs,
    router: router,
  })
});

// @route GET /dashboard/facilities/getFacilityImages/:image
// @desc displays the image
// router.get('/getCardImages/images/:filename', (req, res) => {
//   gfs.files.findOne({
//     filename: req.params.filename
//   }).then(image => {
//     //check if images
//     if (!image || image.length === 0) {
//       return res.status(404).json({
//         err: 'No image found'
//       });
//     }
//     //Read output to browser
//     const readstream = gfs.createReadStream(image.filename);
//     readstream.pipe(res);
//
//   }).catch(err => {
//     console.error(err);
//     console.log(err);
//   });
//
// });


foo().then(res => {
  gfs = res;
  require("./get/getsecondimagename")({
    gfs: gfs,
    router: router,
  })
});



//delete cardDetails

// io.on('connection', function(socket) {
//   socket.on('facilityDeleteData', (data) => {
//     let filename = data.replace(/^.*[\\\/]/, '');
//
//     gfs.files.findOne({
//       filename: filename
//     }).then(image => {
//       //check if images
//       if (!image || image.length === 0) {
//         console.log('No image found');
//       }
//       //image exists than delete it
//       console.log(image._id);
//
//       gfs.remove({
//         _id: image._id,
//         root: 'facilityImages'
//       }).then(() => {
//         console.log('successfully deleted image details from files');
//       }).catch(err => {
//         console.error(err);
//         console.log(err);
//       })
//     }).catch(err => {
//       console.error(err);
//       console.log(err);
//     });
//
//
//     FacilityItem.find().then(docs => {
//       docs.forEach((doc, i) => {
//         let imgname = doc.image.replace(/^.*[\\\/]/, '');
//         if (imgname === filename) {
//
//           FacilityItem.deleteOne({
//             image: doc.image
//           }).then(() => {
//             console.log('Image subject and details successfully deleted');
//             socket.emit('reloadPage', 'reload');
//
//           }).catch(err => {
//             console.error(err);
//             console.log(err);
//           });
//         }
//       });
//     }).catch(err => {
//       console.error(err);
//       console.log(err);
//     });
//
//
//   });
// });

foo().then(res => {
  gfs = res;
  require("./deleteCardDetails")({
    collectionName: collectionName,
    gfs: gfs,
    Item: FacilityItem
  })
});


//
// io.on('connection', function(socket) {
//   socket.on('facilityEditData', (data) => {
//     console.log(data);
//     let filename = data.replace(/^.*[\\\/]/, '');
//     facilityEditItemName = filename;
//     FacilityItem.find().then(docs => {
//       docs.forEach((doc, i) => {
//         let imgname = doc.image.replace(/^.*[\\\/]/, '');
//         if (imgname === filename) {
//           socket.emit('editFacilityItem', {
//             title: doc.title,
//             details: doc.details
//           });
//         }
//       });
//     }).catch(err => {
//       console.error(err);
//       console.log(err);
//     });
//
//   });
// });
//
//
// // edit title and details and card
//
// router.post("/edit", function(req, res) {
//   const facilityItemTitle = req.body.newFacilityItemTitle;
//   const facilitytItemDetails = req.body.newFacilityItemDetails;
//   FacilityItem.find().then(docs => {
//     docs.forEach((doc, i) => {
//       let imgname = doc.image.replace(/^.*[\\\/]/, '');
//       if (imgname === facilityEditItemName) {
//         FacilityItem.updateOne({
//           image: doc.image
//         }, {
//           title: facilityItemTitle,
//           details: facilitytItemDetails
//         }).then(() => {
//           req.flash('success_msg', "values updated successfully");
//           console.log('Facility values updated successfully');
//           res.redirect('back');
//         }).catch(err => {
//           console.error(err);
//           console.log(err);
//         });
//       }
//     });
//   }).catch(err => {
//     if (err) {
//       console.error(err);
//       console.log(err);
//     }
//   });
// });
//
//

require("./editCardDetails")({
  router: router,
  Item: FacilityItem
})


module.exports = router;
