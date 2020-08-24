const {
  ensureAuthenticated
} = require('../../config/auth');

module.exports = function(values){
  const router = values.router;
  const gfs = values.gfs;

  router.get('/getCardImages/images/:filename', (req, res) => {
    gfs.files.findOne({
      filename: req.params.filename
    }).then(image => {
      //check if images
      if (!image || image.length === 0) {
        return res.json({
          err: 'No image found'
        });
      }
      //Read output to browser
      const readstream = gfs.createReadStream(image.filename);
      readstream.pipe(res);

    }).catch(err => {
      console.error(err);
      console.log(err);
    });

  });
}
