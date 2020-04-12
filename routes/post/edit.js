module.exports = function(value){
  let router = value.router;
  let Item = value.Item;

  let editItemId;

  io.on('connection', function(socket) {
    socket.on('editItem', (data) => {
      editItemId = data;
        Item.find({_id:data}).then((foundItems) =>{
          socket.emit('editItem',{
            subject: foundItems[0].subject,
            details: foundItems[0].details
          });
        }).catch((err) =>{
          if(err)
          {
            console.error(err);
            console.log(err);
          }
        })

    });
  });

  router.post("/edit", function(req, res) {
    const itemSubject = req.body.newItemSubject;
    const itemDetails = req.body.newItemDetails;


     Item.findByIdAndUpdate({_id:editItemId},{subject:itemSubject,details:itemDetails}).then((foundItems) => {
        console.log('Variables updated successfully!!');
        res.redirect('back');
      }).catch((err) =>{
        if(err){
          console.error(err);
          console.log(err);
        }
      });

  });
}
