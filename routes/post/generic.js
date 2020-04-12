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
            pos: val
          });

          item.save();
          res.redirect("back");

    }).catch(err =>{
        if(err){
          console.error(err);
          console.log(err);      }
    })
  });
}
