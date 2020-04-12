const {
  ensureAuthenticated
} = require('../../config/auth');

module.exports = function(values){
  const router = values.router;
  const gfs = values.gfs;

  router.get('/getCarausalImages', (req, res) => {
    gfs.files.find().toArray().then(images => {
      //check if images
      if (!images || images.length === 0) {
        return res.status(404).json({
          err: 'No images found'
        });
      }
      //image exists
      res.json(images);
    }).catch(err => {
      console.error(err);
      console.log(err);
    })
  });
}
