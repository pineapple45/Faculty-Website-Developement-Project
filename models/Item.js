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
const contactsItem = mongoose.model('ContactsItem',ItemSchema);
const journalsItem = mongoose.model('JournalsItem',ItemSchema);
const bookItem = mongoose.model('BookItem',ItemSchema);
const groupActivitiesItem = mongoose.model('GroupActivitiesItem',ItemSchema);
const awardsAcademicsItem = mongoose.model('AwardsAcademicsItem',ItemSchema);
const invitedTalksItem = mongoose.model('InvitedTalksItem',ItemSchema);
const labNewsItem = mongoose.model('LabNewsItem',ItemSchema);
const latestResearchItem = mongoose.model('LatestResearchItem',ItemSchema);
const dashboardItem = mongoose.model('DashboardItem',ItemSchema);

// module.exports = interestItem;

module.exports = {
  interestItem: interestItem,
  vacancyItem: vacancyItem,
  contactsItem: contactsItem,
  journalsItem: journalsItem,
  bookItem: bookItem,
  groupActivitiesItem: groupActivitiesItem,
  awardsAcademicsItem:awardsAcademicsItem,
  invitedTalksItem:invitedTalksItem,
  labNewsItem:labNewsItem,
  latestResearchItem:latestResearchItem,
  dashboardItem:dashboardItem,
}
