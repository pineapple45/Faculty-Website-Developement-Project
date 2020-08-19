const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
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

const facilityItem = mongoose.model('FacilityItem',ItemSchema);
const cmResearchScholarItem = mongoose.model('CmResearchScholarItem',ItemSchema);
const cmInternshipStudentsItem = mongoose.model('CmInternshipStudentsItem',ItemSchema);
const cmProjectFellowItem = mongoose.model('CmProjectFellowItem',ItemSchema);
const cmVisitingFacultyItem = mongoose.model('CmVisitingFacultyItem',ItemSchema);
const cmMastersStudentsItem = mongoose.model('CmMastersStudentsItem',ItemSchema);
const cmBachelorStudentsItem = mongoose.model('CmBachelorStudentsItem',ItemSchema);
const dashBoardCardItem = mongoose.model('DashBoardCardItem',ItemSchema);

module.exports = {
  facilityItem:facilityItem,
  cmResearchScholarItem:cmResearchScholarItem,
  cmInternshipStudentsItem:cmInternshipStudentsItem,
  cmProjectFellowItem:cmProjectFellowItem,
  cmVisitingFacultyItem:cmVisitingFacultyItem,
  cmMastersStudentsItem:cmMastersStudentsItem,
  cmBachelorStudentsItem:cmBachelorStudentsItem,
  dashBoardCardItem:dashBoardCardItem,
}
