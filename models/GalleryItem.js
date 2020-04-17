const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  details:{
    type: String,
  },
  image:{
    type: String,
  },
  pos:{
    type: Number,
  }
})

const galleryCardItem = mongoose.model('GalleryCardItem',ItemSchema);

module.exports = galleryCardItem;
