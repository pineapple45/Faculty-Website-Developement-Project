const {
  ensureAuthenticated
} = require('../../config/auth');


module.exports = function(values){
  const router = values.router;
  const gfs = values.gfs;

  router.get('/getCarausalImages/files/:filename', (req, res) => {
    gfs.files.findOne({
      filename: req.params.filename
    }).then(image => {
      //check if images
      if (!image || image.length === 0) {
        return res.status(404).json({
          err: 'No image found'
        });
      }
      //image exists
      res.json(image);
    }).catch(err => {
      console.error(err);
      console.log(err);
    });
  });
}
