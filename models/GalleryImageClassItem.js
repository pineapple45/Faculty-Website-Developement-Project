const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  parentId:{
    type: String,
  },
  addedClass:{
    type: String,
  },
})

const galleryImagesClassItem = mongoose.model('GalleryImagesClassItem',ItemSchema);
module.exports = galleryImagesClassItem;
