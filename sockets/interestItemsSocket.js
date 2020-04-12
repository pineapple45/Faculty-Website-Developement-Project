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
