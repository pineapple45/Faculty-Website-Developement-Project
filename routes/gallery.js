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

// GalleryImageClassItem model
const ClassItem = require('../models/GalleryImageClassItem');


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

io.on('connection', (socket) => {
  socket.on('deleteGalleryItems', (data) =>{
    let imageId = data.imageId;
    let imageName = data.imageName;

    gfs.files.findOne({
      filename: imageName
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
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    });


    Item.deleteOne({
      image:imageName
    }).then(() =>{
      console.log('Image subject and details successfully deleted');
    }).catch(err =>{
      console.error(err);
    });

    ClassItem.deleteOne({parentId:imageId}).then(() =>{
      console.log('Class related to the image and file has been deleted');
      socket.emit('reloadPage', 'reload');
    }).catch(err =>{
      console.log(err);
    })


    // Item.find().then(docs => {
    //   docs.forEach((doc, i) => {
    //     if (imageName === doc.image) {
    //       Item.deleteOne({
    //         image: doc.image
    //       }).then(() => {
    //         console.log('Image subject and details successfully deleted');
    //         socket.emit('reloadPage', 'reload');
    //       }).catch(err => {
    //         console.error(err);
    //         console.log(err);
    //       });
    //     }
    //   });
    // }).catch(err => {
    //   console.error(err);
    //   console.log(err);
    // });

  })
})


router.post('/edit',(req,res) =>{
  const editDetailsGallery = req.body.editDetailsGallery;
  const imagePathGallery = req.body.editDetailsImagePath;
  Item.find().then(docs => {
    docs.forEach((doc, i) => {
      let imgname = doc.image.replace(/^.*[\\\/]/, '');
      if (imgname === imagePathGallery) {
        Item.updateOne({image:imagePathGallery},{details:editDetailsGallery}).then(() =>{
          req.flash('success_msg','Gallery card details succesfully updated');
          console.log('Gallery card details succesfully updated');
        }).catch(err => console.log(err));
      }
    });
  }).catch(err => {
    console.log(err);
  });
  res.redirect('back');
})



io.on('connection',(socket) =>{
  socket.on('clear',(data) =>{
    if(data === 'removeClasses')
    {
      removeAllClasses();
    }
  })
})


io.on('connection',(socket)=>{
  socket.on('orignalClass',(data)=>{
    const parentId = data.parentId;
    const addableClass = data.class;
    addClass(parentId,addableClass);
  })
})


io.on('connection',(socket)=>{
  socket.on('removeOrignalClass',(id)=>{
    const parentId = id;
    removeClass(parentId);
  })
})

io.on('connection',(socket)=>{
  socket.on('bigClass',(data)=>{
    const parentId = data.parentId;
    const addableClass = data.class;
    addClass(parentId,addableClass);
  })
})

io.on('connection',(socket)=>{
  socket.on('removeBigClass',(id)=>{
    const parentId = id;
    removeClass(parentId);
  })
})


io.on('connection',(socket)=>{
  socket.on('horizontalClass',(data)=>{
    const parentId = data.parentId;
    const addableClass = data.class;
    addClass(parentId,addableClass);

  })
})

io.on('connection',(socket)=>{
  socket.on('removeHorizontalClass',(id)=>{
    const parentId = id;
    removeClass(parentId);
  })
})


io.on('connection',(socket)=>{
  socket.on('verticalClass',(data)=>{
    const parentId = data.parentId;
    const addableClass = data.class;
    addClass(parentId,addableClass);

  })
})



function addClass(parentId,addableClass){
  ClassItem.findOne({parentId:parentId}).then(foundItem =>{
    if(foundItem){
      ClassItem.updateOne({parentId:parentId},{addedClass:addableClass}).then(() =>{
        console.log("already present class updated");
        getFilesOfClasses();

      })
    }else{
      const item = new ClassItem({
        parentId:parentId,
        addedClass:addableClass
      });

      item.save().then(() => {
        console.log('class added to database')
        getFilesOfClasses();
      });
    }
  })
}

function removeAllClasses(){
  ClassItem.deleteMany({}).then(() => {
    console.log('all classes removed from database');
    getFilesOfClasses();
  })
}

function getFilesOfClasses(){
  ClassItem.find().then((foundItems) =>{
    io.on('connection',(socket) =>{
      socket.emit('foundItems',foundItems);
    })
  })
}


module.exports = router;
