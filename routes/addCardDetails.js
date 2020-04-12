const {
  ensureAuthenticated
} = require('../config/auth');

module.exports = function(Item){

  const defaultCardItem = new Item({
    title: "Default Title",
    details: "Default Details",
    image: "Default image details",
    pos: 0
  });



  io.on('connection', function(socket) {
    socket.on('CardValues', (data) => {
      console.log(data);
      if(data.cardFile === ""){
        console.log("image feild empty!");
      }
      else{
        Item.find().then(foundItems => {
            if (foundItems.length === 0) {
              Item.create(defaultCardItem).then(()=>{
                console.log("Default Item Successfully added!");
              }).catch(err =>{
                console.error(err);
                console.log(err);
              })
            } else {
              Item.countDocuments({}).then(val =>{
                const newCardItem = new Item({
                  title: data.cardTitle,
                  details: data.cardDetails,
                  image: data.cardFile,
                  pos: val
                });

                Item.create(newCardItem).then(() =>{
                  console.log("New Items Successfully added!");
                }).catch(err =>{
                  console.error(err);
                  console.log(err);
                });
              }).catch(err =>{
                console.error(err);
                console.log(err);
              });

            }
        }).catch(err =>{
          console.error(err);
          console.log(err);
        });

      }
    });
  });


  io.on('connection', function(socket){
    Item.find((err,items)=>{
      socket.emit('CardItems',items);
    });
  });
}
