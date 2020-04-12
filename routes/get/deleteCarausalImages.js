const merthodOverride = require('method-override');

const {
  ensureAuthenticated
} = require('../../config/auth');


module.exports = function(values){
  const router = values.router;
  const gfs = values.gfs;
  const collectionName = values.collectionName;

  router.delete('/getCarausalImages/images/:id', (req, res) => {
    gfs.remove({
      _id: req.params.id,
      root: collectionName
    }).then((gridstore) => {
      req.flash('success_msg', "image deleted");
      console.log('carausal image deleted succesfully!!')
      res.redirect('back');
    }).catch(err => {
      console.log(err);
      return res.status(404).json({
        err: err
      });
    })
  });
}
