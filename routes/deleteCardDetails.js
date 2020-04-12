const {
  ensureAuthenticated
} = require('../config/auth');

module.exports = function(values){
  const Item = values.Item;
  const collectionName = values.collectionName;
  const gfs = values.gfs;

  io.on('connection', function(socket) {
    socket.on('deleteCardData', (data) => {
      let filename = data.replace(/^.*[\\\/]/, '');

      gfs.files.findOne({
        filename: filename
      }).then(image => {
        //check if images
        if (!image || image.length === 0) {
          console.log('No image found');
        }
        //image exists than delete it
        console.log(image._id);

        gfs.remove({
          _id: image._id,
          root: collectionName
        }).then(() => {
          console.log('successfully deleted image details from files');
        }).catch(err => {
          console.error(err);
          console.log(err);
        })
      }).catch(err => {
        console.error(err);
        console.log(err);
      });


      Item.find().then(docs => {
        docs.forEach((doc, i) => {
          let imgname = doc.image.replace(/^.*[\\\/]/, '');
          if (imgname === filename) {

            Item.deleteOne({
              image: doc.image
            }).then(() => {
              console.log('Image subject and details successfully deleted');
              socket.emit('reloadPage', 'reload');
            }).catch(err => {
              console.error(err);
              console.log(err);
            });
          }
        });
      }).catch(err => {
        console.error(err);
        console.log(err);
      });


    });
  });

}
