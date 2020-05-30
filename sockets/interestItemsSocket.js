const mongoose = require("mongoose");



io.on('connection', function(socket) {
  console.log('made socket connection' + socket.id);

  socket.on('dragdiv', (data) => {

    var startindex = data.startindex;
    var starttextid = data.starttextid;
    var starttext = data.starttext;
    var endindex = data.endindex;
    var endtextid = data.endtextid;
    var endtext = data.endtext;
    var href = data.href;
    io.sockets.emit('dragdiv', data);
    const model = require('../models/InterestItem');
    var Item = {};

    if(href.includes('researchInterest')){
      Item = model.interestItem;
    }
    else if(href.includes('vacancy')){
      Item = model.vacancyItem;
    }
    else if(href.includes('journals')){
      Item = model.journalsItem;
    }
    else if(href.includes('book-and-book-chapters')){
      Item = model.bookItem;
    }
    else if(href.includes('group-activities')){
      Item = model.groupActivitiesItem;
    }
    else if(href.includes('awards-and-academics')){
      Item = model.awardsAcademicsItem;
    }
    else if(href.includes('invited-talks')){
      Item = model.invitedTalksItem;
    }
    else if(href.includes('lab-news')){
      Item = model.labNewsItem;
    }
    else if(href.includes('latest-research')){
      Item = model.latestResearchItem;
    }
    else if(href.includes('dashboard')){
      Item = model.dashboardItem;
    }


    function swap() {
      Item.findOneAndUpdate({
        _id: starttextid
      }, {
        pos: startindex
      }, (err) => {
        if (err) {
          console.log(err);
        }
      });
      Item.findOneAndUpdate({
        _id: endtextid
      }, {
        pos: endindex
      }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    async function init() {
      await swap();
      console.log('Items swapped successfully!!');
    }

    init();

  });
});
