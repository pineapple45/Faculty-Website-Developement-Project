const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
  subject:{
    type: String,
    required: true
  },
  details:{
    type: String,
    required: true
  },
  pos:{
    type: Number,
  }
})


const interestItem = mongoose.model('InterestItem',ItemSchema);
const vacancyItem = mongoose.model('VacancyItem',ItemSchema);
// module.exports = interestItem;

module.exports = {
  interestItem: interestItem,
  vacancyItem: vacancyItem
}
