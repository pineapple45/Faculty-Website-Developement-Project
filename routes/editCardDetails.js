const {
  ensureAuthenticated
} = require('../config/auth');

module.exports = function(values){
  const Item = values.Item;
  const router = values.router;
  let cardEditItemName = "";


  io.on('connection', function(socket) {
    socket.on('cardEditData', (data) => {
      let filename = data.replace(/^.*[\\\/]/, '');
      cardEditItemName = filename;
      Item.find().then(docs => {
        docs.forEach((doc, i) => {
          let imgname = doc.image.replace(/^.*[\\\/]/, '');
          if (imgname === filename) {
            socket.emit('editCardItem', {
              title: doc.title,
              details: doc.details
            });
          }
        });
      }).catch(err => {
        console.error(err);
        console.log(err);
      });

    });
  });


  // edit title and details and card

  router.post("/edit", function(req, res) {
    const cardItemTitle = req.body.newCardItemTitle;
    const cardItemDetails = req.body.newCardItemDetails;
    Item.find().then(docs => {
      docs.forEach((doc, i) => {
        let imgname = doc.image.replace(/^.*[\\\/]/, '');
        if (imgname === cardEditItemName) {
          Item.updateOne({
            image: doc.image
          }, {
            title: cardItemTitle,
            details: cardItemDetails
          }).then(() => {
            req.flash('success_msg', "values updated successfully");
            console.log('Facility values updated successfully');
            res.redirect('back');
          }).catch(err => {
            console.error(err);
            console.log(err);
          });
        }
      });
    }).catch(err => {
      if (err) {
        console.error(err);
        console.log(err);
      }
    });
  });

}
