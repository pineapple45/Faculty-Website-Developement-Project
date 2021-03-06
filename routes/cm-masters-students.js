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

const collectionName = 'cmMastersStudentsImages';

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


// CmResearchScholarItem model
const model = require('../models/CardItem');
const CmMastersStudentsItem = model.cmMastersStudentsItem;
const Item = CmMastersStudentsItem;

foo().then(res => {
  gfs = res;
  require('./get/secondgeneric')({
    router: router,
    gfs: gfs,
    renderedPage: 'cm-masters-students',
    Item:Item,
  });
});

foo().then(res => {
  gfs = res;
  require('./get/getCardData')({
    router: router,
    gfs: gfs,
    renderedPage: 'cm-masters-students',
    Item:Item,
  });
});

// @route POST /dashboard/facilities/uploadFacilityImages
// @desc uploads file to // DB

getfoo().then(res => {
  require("./post/uploadCardData")({
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

//delete cardData
getfoo().then(res => {
  require("./post/deleteCardData")({
    Item: Item,
    uploadCardImages: res.uploadCardImages,
    gfs: res.gfs,
    router: router,
    collectionName: collectionName
  })
})

//delete cardDetails

// foo().then(res => {
//   gfs = res;
//   require("./deleteCardDetails")({
//     collectionName: collectionName,
//     gfs: gfs,
//     Item: Item
//   })
// });

require("./post/editCardDetails")({
  router: router,
  Item: Item
})


module.exports = router;
