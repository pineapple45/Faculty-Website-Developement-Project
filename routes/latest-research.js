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

// DB Config
const db = require('../config/keys').MongoURI;

mongoose.set('useFindAndModify', false);


//middleware for merthodOverride

router.use(merthodOverride('_method'));

const collectionName = 'LatestResearchImages';

// NOW WE WORK ON UPLOADING FILES TO THE CARAUSAL

//create the storage engine
const storage = require("./storage/storageEngine.js")(collectionName);

const uploadCarausalImages = require("./storage/multerFunction")(storage);

// Init gridfs

function foo(){
   return new Promise( (resolve, reject) => {
    conn.once('open', function() {
      let gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection(collectionName);
      resolve(gfs);
    })
  })
}

let gfs;

//InterItem model
const model = require('../models/Item');
const LatestResearchItem = model.latestResearchItem;
const Item = LatestResearchItem;

foo().then( res => {
 gfs = res;
 require("./get/genericWithCarausal")({
   router: router,
   Item: Item,
   renderedPage: 'latest-research',
   collectionName: collectionName,
   gfs: gfs
 })
});

require("./post/generic")({
  router: router,
  Item: Item
});

require("./post/delete")({
  router: router,
  Item: Item
});

require("./post/edit")({
  router: router,
  Item: Item
});

foo().then( res => {
 gfs = res;
 require("./post/uploadCarausalImage")({
   Item: Item,
   uploadCarausalImages: uploadCarausalImages,
   gfs: gfs,
   router: router,
   collectionName: collectionName
 })
});

foo().then( res => {
 gfs = res;
 require("./get/getCarausalImages")({
   gfs: gfs,
   router: router,
 })
});

foo().then( res => {
 gfs = res;
 require("./get/getfilename")({
   gfs: gfs,
   router: router,
 })
});

foo().then( res => {
 gfs = res;
 require("./get/getimagename")({
   gfs: gfs,
   router: router,
 })
});


foo().then( res => {
 gfs = res;
 require("./post/deleteCarausalImages")({
   gfs: gfs,
   router: router,
   collectionName: collectionName,
 })
});


module.exports = router;
