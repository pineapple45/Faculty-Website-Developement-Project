const multer = require('multer');

const {
  ensureAuthenticated
} = require('../../config/auth');

var uploadImageName = "";


module.exports = function(values){
  const Item = values.Item;
  const router = values.router;

  io.on('connection', (socket) => {
    socket.on('ImageName', (data) =>{
      uploadImageName = data.uploadCardImageName;
      // postData(uploadImageName);
    })
  })

  // function postData(uploadImageName){
  //   router.post('/uploadCardDetails',(req,res) => {
  //     const itemTitle = req.body.newCardItemTitle;
  //     const itemInfo = req.body.newCardItemDetails;
  //
  //     Item.countDocuments({}).then(val =>{
  //           const item = new Item({
  //             title: itemTitle,
  //             details: itemInfo,
  //             image: uploadImageName,
  //             pos: val
  //           });
  //
  //           item.save();
  //           res.redirect("back");
  //
  //     }).catch(err =>{
  //         if(err){
  //           console.error(err);
  //           console.log(err);
  //        }
  //     })
  //   });
  // }


  router.post('/uploadCardDetails',(req,res) => {
    const itemTitle = req.body.newCardItemTitle;
    const itemInfo = req.body.newCardItemDetails;

    Item.countDocuments({}).then(val =>{
          const item = new Item({
            title: itemTitle,
            details: itemInfo,
            image: uploadImageName,
            pos: val
          });

          item.save();
          res.redirect("back");

    }).catch(err =>{
        if(err){
          console.error(err);
          console.log(err);
       }
    })
  });


}
