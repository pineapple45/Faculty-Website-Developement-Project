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

const collectionName = 'galleryCardImages';

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
const storage = require("./storage/secondStorageEngine")(collectionName);

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

mongoose.set('useFindAndModify', false);

// let editItemId;
let facilityEditItemName;


// GalleryCardItem model
const Item = require('../models/GalleryItem');

foo().then(res => {
  gfs = res;
  require('./get/secondgeneric')({
    router: router,
    gfs: gfs,
    renderedPage: 'gallery',
    Item:Item,
  });
});





// @route POST /dashboard/gallery/uploadCardImages
// @desc uploads file to // DB

getfoo().then(res => {
  require("./post/uploadGalleryCardImage")({
    Item: Item,
    uploadCardImages: res.uploadCardImages,
    gfs: res.gfs,
    router: router,
    collectionName: collectionName
  })
})


foo().then(res => {
  gfs = res;
  require("./get/getCardImages")({
    gfs: gfs,
    router: router,
  })
});

foo().then(res => {
  gfs = res;
  require("./get/getsecondfilename")({
    gfs: gfs,
    router: router,
  })
});

foo().then(res => {
  gfs = res;
  require("./get/getsecondimagename")({
    gfs: gfs,
    router: router,
  })
});

//delete cardDetails

// foo().then(res => {
//   gfs = res;
//   require("./deleteCardDetails")({
//     collectionName: collectionName,
//     gfs: gfs,
//     Item: Item
//   })
// });


io.on('connection', (socket) => {
  socket.on('deletedImageName', (data) =>{
    let deletedGalleryImageName = data.deletedGalleryImageName;

    gfs.files.findOne({
      filename: deletedGalleryImageName
    }).then(image => {
      //check if images
      if (!image || image.length === 0) {
        console.log('No image found');
      }
      //image exists than delete it

      gfs.remove({
        _id: image._id,
        root: collectionName
      }).then(() => {
        console.log('successfully deleted image details from files');
      }).catch(err => {
        console.error(err);
        console.log(err);
      })
    }).catch(err => {
      console.error(err);
      console.log(err);
    });


    Item.find().then(docs => {
      docs.forEach((doc, i) => {
        if (deletedGalleryImageName === doc.image) {
          Item.deleteOne({
            image: doc.image
          }).then(() => {
            console.log('Image subject and details successfully deleted');
            socket.emit('reloadPage', 'reload');
          }).catch(err => {
            console.error(err);
            console.log(err);
          });
        }
      });
    }).catch(err => {
      console.error(err);
      console.log(err);
    });

  })
})

require("./editCardDetails")({
  router: router,
  Item: Item
})


module.exports = router;
