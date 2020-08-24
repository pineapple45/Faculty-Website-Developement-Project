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
  timeStamp:{
    type: Number,
    default: Date.now()
  },
  pos:{
    type: Number,
  },
})

const facilityItem = mongoose.model('FacilityItem',ItemSchema);
const cmResearchScholarItem = mongoose.model('CmResearchScholarItem',ItemSchema);
const cmInternshipStudentsItem = mongoose.model('CmInternshipStudentsItem',ItemSchema);
const cmProjectFellowItem = mongoose.model('CmProjectFellowItem',ItemSchema);
const cmVisitingFacultyItem = mongoose.model('CmVisitingFacultyItem',ItemSchema);
const cmMastersStudentsItem = mongoose.model('CmMastersStudentsItem',ItemSchema);
const cmBachelorStudentsItem = mongoose.model('CmBachelorStudentsItem',ItemSchema);

const allumniResearchScholarItem = mongoose.model('allumniResearchScholarItem',ItemSchema);
const allumniInternshipStudentsItem = mongoose.model('allumniInternshipStudentsItem',ItemSchema);
const allumniProjectFellowItem = mongoose.model('allumniProjectFellowItem',ItemSchema);
const allumniVisitingFacultyItem = mongoose.model('allumniVisitingFacultyItem',ItemSchema);
const allumniMastersStudentsItem = mongoose.model('allumniMastersStudentsItem',ItemSchema);
const allumniBachelorStudentsItem = mongoose.model('allumniBachelorStudentsItem',ItemSchema);
const dashBoardCardItem = mongoose.model('DashBoardCardItem',ItemSchema);

module.exports = {
  facilityItem:facilityItem,
  cmResearchScholarItem:cmResearchScholarItem,
  cmInternshipStudentsItem:cmInternshipStudentsItem,
  cmProjectFellowItem:cmProjectFellowItem,
  cmVisitingFacultyItem:cmVisitingFacultyItem,
  cmMastersStudentsItem:cmMastersStudentsItem,
  cmBachelorStudentsItem:cmBachelorStudentsItem,

  allumniResearchScholarItem:allumniResearchScholarItem,
  allumniInternshipStudentsItem:allumniInternshipStudentsItem,
  allumniProjectFellowItem:allumniProjectFellowItem,
  allumniVisitingFacultyItem:allumniVisitingFacultyItem,
  allumniMastersStudentsItem:allumniMastersStudentsItem,
  allumniBachelorStudentsItem:allumniBachelorStudentsItem,

  dashBoardCardItem:dashBoardCardItem,
}
