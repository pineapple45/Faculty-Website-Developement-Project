const multer = require('multer');

const {
  ensureAuthenticated
} = require('../../config/auth');

module.exports = function(values){
  const Item = values.Item;
  const uploadCarausalImages = values.uploadCarausalImages;
  const gfs = values.gfs;
  const router = values.router;
  const collectionName = values.collectionName;

  const upload = uploadCarausalImages.array(collectionName, 12);

  router.post('/uploadCarausalImages', (req, res) => {
    let dbItem = new Item();

    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(err);
        req.flash('error', err.message);
        res.redirect('back');

      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
        if (err.message === "Only jpg/png/webp/tif file formats are allowed") {
          req.flash('error', err.message);
        } else {
          req.flash('error', 'Some Network error appeared! Please try again in some time');
        }
        // req.flash('error',err.message);
        res.redirect('back');

      } else {
        gfs.files.find().toArray().then(images => {
          //check if images
          if (!images || images.length === 0) {
            return res.status(404).json({
              err: 'No images found'
            });
          }
          //image exists
          req.flash('success_msg', "images added to carausal");
          res.redirect('back');
        }).catch(err => {
          console.log(err);
        });
      }
    });
  });
}
