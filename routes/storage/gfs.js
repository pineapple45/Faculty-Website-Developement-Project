const {
  ensureAuthenticated
} = require('../../config/auth');

module.exports = function(value){
    const collectionName = value.collectionName;
    const gfs = value.gfs;
    gfs.collection(collectionName);
  }
