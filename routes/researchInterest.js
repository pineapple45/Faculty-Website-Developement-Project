const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const {
  GridFSBucket
} = require('mongo');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require("path");
const bcrypt = require('bcryptjs');
const merthodOverride = require('method-override');

const {
  ensureAuthenticated
} = require('../config/auth');


// DB Config
const db = require('../config/keys').MongoURI;

mongoose.set('useFindAndModify', false);


//middleware for merthodOverride

router.use(merthodOverride('_method'));

const collectionName = 'researchInterestImages';

// NOW WE WORK ON UPLOADING FILES TO THE CARAUSAL



//create the storage engine
// const storage = new GridFsStorage({
//   url: db,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       const fileInfo = {
//         filename: file.fieldname + '-' + Date.now() + path.extname(file.originalname),
//         bucketName: 'researchInterestImages'
//       };
//       resolve(fileInfo);
//     });
//   }
// });

//create the storage engine
const storage = require("./storage/storageEngine.js")(collectionName);



// const uploadResearchInterestItemImages = multer({
//   storage: storage,
//   limits: {
//     fileSize: 125000,
//     files: 12,
//   },
//   fileFilter: function(req, file, cb) {
//     if (path.extname(file.originalname) === '.jpg' || path.extname(file.originalname) === '.png' || path.extname(file.originalname) === '.webp' || path.extname(file.originalname) === '.tif') {
//       // return cb(new Error('Only jpg files are allowed'))
//       cb(null, true)
//     } else {
//       return cb(new Error('Only jpg/png/webp/tif file formats are allowed'))
//     }
//     // cb(null, true)
//   },
// });

// const uploadResearchInterestItemImages = require("./storage/multerFunction")(storage);
const uploadCarausalImages = require("./storage/multerFunction")(storage);


// Init gridfs
// let gfs;
//
// conn.once('open', function() {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('researchInterestImages');
//   // require("./storage/gfs")({
//   //   collectionName: collectionName,
//   //   gfs: gfs
//   // });
//
// })


function foo(){
   return new Promise( (resolve, reject) => { // I want foo() to PROMISE me something
    // setTimeout ( function(){
    //   // promise is RESOLVED , when execution reaches this line of code
    //    resolve('wohoo')// After 1 second, RESOLVE the promise with value 'wohoo'
    // }, 1000 )
    conn.once('open', function() {
      let gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('researchInterestImages');
      // require("./storage/gfs")({
      //   collectionName: collectionName,
      //   gfs: gfs
      // });
      resolve(gfs);
    })
  })
}

let gfs;

// foo().then( res => {
//  gfs = res;
// });

//InterItem model
const model = require('../models/InterestItem');
const InterestItem = model.interestItem;

// let editItemId;

// router.get("/", function(req, res) {
//
//     gfs.files.find().toArray().then(files =>{
//       //check if images
//      if(!files || files.length === 0)
//      {
//          // res.render('researchInterest', {files: false});
//
//          InterestItem.find(function(err, foundItems) {
//            if (err) {
//              console.log(err);
//            } else {
//              if (foundItems.length === 0) {
//
//                res.render("researchInterest", {
//                  newItems: false,
//                  files: false
//                });
//                // res.redirect("back");
//              } else {
//                res.render("researchInterest", {
//                  newItems: foundItems,
//                  files: false
//                });
//              }
//            }
//          }).sort({
//            pos: 1
//          }).exec(function(err, docs) {
//            if(err)
//            {
//              console.log(err);
//            }
//
//          });
//      }else{
//
//        InterestItem.find(function(err, foundItems) {
//          if (err) {
//            console.log(err);
//          } else {
//            if (foundItems.length === 0) {
//
//              res.render("researchInterest", {
//                newItems: false,
//                files: files
//              });
//            } else {
//              res.render("researchInterest", {
//                newItems: foundItems,
//                files: files
//              });
//            }
//          }
//        }).sort({
//          pos: 1
//        }).exec(function(err, docs) {
//          if(err)
//          {
//            console.log(err);
//          }
//
//        });
//      }
//     }).catch(err =>{
//       console.error(err);
//       console.log(err);
//     });
// });

// require("./get/genericWithCarausal")({
//   router: router,
//   Item: InterestItem,
//   renderedPage: 'researchInterest',
//   collectionName: 'researchInterestImages',
// })

foo().then( res => {
 gfs = res;
 require("./get/genericWithCarausal")({
   router: router,
   Item: InterestItem,
   renderedPage: 'researchInterest',
   collectionName: 'researchInterestImages',
   gfs: gfs
 })
});

// router.post("/", function(req, res) {
//   const interestItemSubject = req.body.newInterestItemSubject;
//   const interestItemDetails = req.body.newInterestItemDetails;
//
//   InterestItem.countDocuments({}).then(val =>{
//         const interestItem = new InterestItem({
//           subject: interestItemSubject,
//           details: interestItemDetails,
//           pos: val
//         });
//
//         interestItem.save();
//         res.redirect("/dashboard/researchInterest");
//   }).catch(err =>{
//       if(err){
//         console.error(err);
//         console.log(err);      }
//   })
// });
require("./post/generic")({
  router: router,
  Item: InterestItem
});


// var deleteItemId = "";
//
// io.on('connection', function(socket) {
//   socket.on('deleteInterestItem', (data) => {
//       deleteItemId = data;
//   });
// });
//
//
// router.post("/delete", function(req, res) {
//
//   InterestItem.findByIdAndRemove(deleteItemId).then(() =>{
//     console.log(deleteItemId);
//     console.log('Item deleted successfully');
//     deleteItemId = "";
//     res.redirect("/dashboard/researchInterest");
//   }).catch(err =>{
//     if (err) {
//       console.error(err);
//       console.log(err);
//     }
//   });
//
//
// });

require("./post/delete")({
  router: router,
  Item: InterestItem
});



// io.on('connection', function(socket) {
//   socket.on('editInterestItem', (data) => {
//     editItemId = data;
//
//       InterestItem.find({_id:data}).then((foundItems) =>{
//         socket.emit('editInterestItem',{
//           subject: foundItems[0].subject,
//           details: foundItems[0].details
//         });
//       }).catch((err) =>{
//         if(err)
//         {
//           console.error(err);
//           console.log(err);
//         }
//       })
//
//
//   });
// });
//
//
//
//
// router.post("/edit", function(req, res) {
//   const interestItemSubject = req.body.newInterestItemSubject;
//   const interestItemDetails = req.body.newInterestItemDetails;
//
//
//    InterestItem.findByIdAndUpdate({_id:editItemId},{subject:interestItemSubject,details:interestItemDetails}).then((foundItems) => {
//       console.log('Variables updated successfully!!');
//       res.redirect('/dashboard/researchInterest');
//     }).catch((err) =>{
//       if(err){
//         console.error(err);
//         console.log(err);
//       }
//     });
//
// });

require("./post/edit")({
  router: router,
  Item: InterestItem
});




// @route POST /dashboard/facilities/uploadFacilityImages
// @desc uploads file to // DB

// const upload = uploadResearchInterestItemImages.array('researchInterestImages', 12);
// router.post('/uploadResearchInterestItemImages', (req, res) => {
//   let dbItem = new InterestItem();
//
//   upload(req, res, function(err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//       console.log(err);
//       req.flash('error', err.message);
//       res.redirect('back');
//
//     } else if (err) {
//       // An unknown error occurred when uploading.
//       console.log(err);
//       if (err.message === "Only jpg/png/webp/tif file formats are allowed") {
//         req.flash('error', err.message);
//       } else {
//         req.flash('error', 'Some Network error appeared! Please try again in some time');
//       }
//       // req.flash('error',err.message);
//       res.redirect('back');
//
//     } else {
//       gfs.files.find().toArray().then(images => {
//         //check if images
//         if (!images || images.length === 0) {
//           return res.status(404).json({
//             err: 'No images found'
//           });
//         }
//         //image exists
//         req.flash('success_msg', "images added to carausal");
//         res.redirect('back');
//       }).catch(err => {
//         console.error(err);
//         console.log(err);
//       });
//     }
//   });
// });

foo().then( res => {
 gfs = res;
 require("./post/uploadCarausalImage")({
   Item: InterestItem,
   uploadCarausalImages: uploadCarausalImages,
   gfs: gfs,
   router: router,
   collectionName: collectionName
 })
});


// require("./post/uploadCarausalImage")({
//   Item: InterestItem,
//   uploadCarausalImages: uploadCarausalImages,
//   gfs: gfs,
//   router: router,
//   collectionName: 'researchInterestImages'
// })


// @route GET /dashboard/facilities/getFacilityImages
// @desc displays all files
// router.get('/getResearchInterestItemImages', (req, res) => {
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

foo().then( res => {
 gfs = res;
 require("./get/getCarausalImages")({
   gfs: gfs,
   router: router,
 })
});


// @route GET /dashboard/facilities/getFacilityImages/:filename
// @desc displays filename
// router.get('/getCarausalImages/files/:filename', (req, res) => {
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


foo().then( res => {
 gfs = res;
 require("./get/getfilename")({
   gfs: gfs,
   router: router,
 })
});



// @route GET /dashboard/facilities/getFacilityImages/:image
// @desc displays the image
// router.get('/getResearchInterestItemImages/images/:filename', (req, res) => {
//   gfs.files.findOne({
//     filename: req.params.filename
//   }).then(image => {
//     //check if images
//     if (!image || image.length === 0) {
//       return res.status(404).json({
//         err: 'No image found'
//       });
//     } else {
//       //Read output to browser
//       const readstream = gfs.createReadStream(image.filename);
//       readstream.pipe(res);
//     }
//
//   }).catch(err => {
//     console.error(err);
//     console.log(err);
//   });
//
// });

foo().then( res => {
 gfs = res;
 require("./get/getimagename")({
   gfs: gfs,
   router: router,
 })
});


// @route /dashboard/researchInterest/getResearchInterestItemImages/images/ :image_id
// @desc DELETE carausal images

// router.delete('/getResearchInterestItemImages/images/:id', (req, res) => {
//   gfs.remove({
//     _id: req.params.id,
//     root: 'researchInterestImages'
//   }).then((gridstore) => {
//     req.flash('success_msg', "image deleted");
//     console.log('carausal image deleted succesfully!!')
//     res.redirect('back');
//   }).catch(err => {
//     console.log(err);
//     return res.status(404).json({
//       err: err
//     });
//   })
// });

foo().then( res => {
 gfs = res;
 require("./get/deleteCarausalImages")({
   gfs: gfs,
   router: router,
   collectionName: collectionName,
 })
});


module.exports = router;
