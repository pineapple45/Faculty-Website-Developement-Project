module.exports = function(value){
  let router = value.router;
  let Item = value.Item;

  var deleteItemId = "";

  io.on('connection', function(socket) {
    socket.on('deleteItem', (data) => {
        deleteItemId = data;
    });
  });

  router.post("/delete", function(req, res) {

    Item.findByIdAndRemove(deleteItemId).then(() =>{
      console.log(deleteItemId);
      console.log('Item deleted successfully');
      deleteItemId = "";
      res.redirect("back");
    }).catch(err =>{
      if (err) {
        console.error(err);
        console.log(err);
      }
    });


  });
}
