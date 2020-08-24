module.exports = function(value){
  let router = value.router;
  let Item = value.Item;

  router.post("/", function(req, res) {
    const itemSubject = req.body.newItemSubject;
    const itemDetails = req.body.newItemDetails;

    Item.countDocuments({}).then(val =>{
          const item = new Item({
            subject: itemSubject,
            details: itemDetails,
            pos: val,
            timeStamp: Date.now()
          });

          item.save().then(() =>{
            res.redirect("back");
          }).catch(err =>{
            console.log(err);
            req.flash('error', err.message);
            res.redirect('back');
          });

    }).catch(err =>{
        if(err){
          console.log(err); 
        }
    })
  });
}
