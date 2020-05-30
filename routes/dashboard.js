const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const {GridFSBucket} = require('mongo');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require("path");
const bcrypt = require('bcryptjs');

const {
  ensureAuthenticated
} = require('../config/auth');



// DB Config
const db = require('../config/keys').MongoURI;
mongoose.set('useFindAndModify', false);


//dashboardDetails model
const secondmodel = require('../models/InterestItem');
const DashboardItem = secondmodel.dashboardItem;
const AnotherItem = DashboardItem;

// require("./get/generic")({router:router,Item:AnotherItem,renderedPage:'dashboard'});

require("./post/generic")({router:router,Item:AnotherItem});

require("./post/delete")({router:router,Item:AnotherItem});

require("./post/edit")({router:router,Item:AnotherItem});




const collectionName = 'dashboardCardImage';

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


// let editItemId;
let facilityEditItemName;


// Facility model
const model = require('../models/FacilityItem');
const DashBoardCardItem = model.dashBoardCardItem;
const CardItem = DashBoardCardItem;

// foo().then(res => {
//   gfs = res;
//   require('./get/secondgeneric')({
//     router: router,
//     gfs: gfs,
//     renderedPage: 'dashboard',
//     Item:CardItem,
//   });
// });

router.get("/", function(req, res) {

    gfs.files.find().toArray().then(files =>{
      //check if images
     if(!files || files.length === 0)
     {
         // res.render('researchInterest', {files: false});

         AnotherItem.find(function(err, foundItems) {
           if (err) {
             console.log(err);
           } else {
             if (foundItems.length === 0) {

               res.render('dashboard', {
                 newItems: false,
                 cardItems: false,
                 files: false
               });
               // res.redirect("back");
             } else {
               res.render('dashboard', {
                 newItems: foundItems,
                 files: false
               });
             }
           }
         }).sort({
           pos: 1
         }).exec(function(err, docs) {
           if(err)
           {
             console.log(err);
           }

         });
     }else{

       AnotherItem.find(function(err, foundItems) {
         CardItem.find(function(err, foundCardItems){
           if (err) {
             console.log(err);
           } else {
             if (foundItems.length === 0) {

               res.render('dashboard', {
                 newItems: false,
                 files: foundCardItems
               });
             } else {
               res.render('dashboard', {
                 newItems: foundItems,
                 files: foundCardItems
               });
             }
           }
         })
       }).sort({
         pos: 1
       }).exec(function(err, docs) {
         if(err)
         {
           console.log(err);
         }

       });
     }
    }).catch(err =>{
      console.error(err);
      console.log(err);
    });
});



// @route POST /dashboard/facilities/uploadFacilityImages
// @desc uploads file to // DB

getfoo().then(res => {
  require("./post/uploadCardImage")({
    Item: CardItem,
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

foo().then(res => {
  gfs = res;
  require("./deleteCardDetails")({
    collectionName: collectionName,
    gfs: gfs,
    Item: CardItem
  })
});

// require("./editCardDetails")({
//   router: router,
//   Item: CardItem
// })


io.on('connection', function(socket) {
  socket.on('cardEditData', (data) => {
    let filename = data.replace(/^.*[\\\/]/, '');
    cardEditItemName = filename;
    CardItem.find().then(docs => {
      docs.forEach((doc, i) => {
        let imgname = doc.image.replace(/^.*[\\\/]/, '');
        if (imgname === filename) {
          socket.emit('editCardItem', {
            title: doc.title,
            details: doc.details
          });
        }
      });
    }).catch(err => {
      console.error(err);
      console.log(err);
    });

  });
});


io.on('connection', function(socket) {
  socket.on('cardEditData', (data) => {
   

  });
});

// edit title and details and card

router.post("/editCard", function(req, res) {
  const cardItemTitle = req.body.newCardItemTitle;
  const cardItemDetails = req.body.newCardItemDetails;
  CardItem.find().then(docs => {
    docs.forEach((doc, i) => {
      let imgname = doc.image.replace(/^.*[\\\/]/, '');
      if (imgname === cardEditItemName) {
        CardItem.updateOne({
          image: doc.image
        }, {
          title: cardItemTitle,
          details: cardItemDetails
        }).then(() => {
          req.flash('success_msg', "card values updated successfully");
          console.log('Card values updated successfully');
          res.redirect('back');
        }).catch(err => {
          console.error(err);
          console.log(err);
        });
      }
    });
  }).catch(err => {
    if (err) {
      console.error(err);
      console.log(err);
    }
  });
});

module.exports = router;
