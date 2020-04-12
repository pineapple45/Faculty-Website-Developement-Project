const multer = require('multer');

const {
  ensureAuthenticated
} = require('../../config/auth');

module.exports = function(values){
  const Item = values.Item;
  const uploadCardImages = values.uploadCardImages;
  const gfs = values.gfs;
  const router = values.router;
  const collectionName = values.collectionName;

  const upload = uploadCardImages.single('image');

  router.post('/uploadCardImages',(req,res) => {
        upload(req,res,function (err) {
          if (err instanceof multer.MulterError) {
             // A Multer error occurred when uploading.
             console.log(err);
             req.flash('error',err.message);
             res.redirect('back');

           } else if (err) {
             // An unknown error occurred when uploading.
             console.log(err);
             if(err.message === "Only jpg/png/webp/tif file formats are allowed")
             {
               req.flash('error',err.message);
             }
             else if(err.message === 'Image with same name already exists in database.Upload with different name')
             {
               req.flash('error',err.message);
             }
             else{
               req.flash('error','Some Network error appeared! Please try again in some time');
             }
             // req.flash('error',err.message);
             res.redirect('back');
           }
           else{
             gfs.files.find().toArray().then(images => {
                   //check if images
                  if(!images || images.length === 0)
                  {
                      return res.status(404).json({
                        err: 'No images found'
                      });
                  }
                  //image exists
                  req.flash('success_msg',"images added");
                  res.redirect('back');
                 }).catch(err =>{
                   console.error(err);
                   console.log(err);
                 });
           }
        })


  });

}
