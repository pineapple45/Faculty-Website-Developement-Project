const mongoose = require('mongoose');


const FacilityItemSchema = new mongoose.Schema({
  title:{
    type: String,
  },
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


const facilityItem = mongoose.model('FacilityItem',FacilityItemSchema);
module.exports = facilityItem;
