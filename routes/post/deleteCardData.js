module.exports = function(values){
    const Item = values.Item;
    const collectionName = values.collectionName;
    const gfs = values.gfs;
    const router = values.router;

    let filename = "";
  
    io.on('connection', function(socket) {
      socket.on('deleteCardData', (data) => {
         filename = data.replace(/^.*[\\\/]/, '');  
      });
    });

    router.post('/deleteCardData',(req,res) =>{
        gfs.files.findOne({
            filename: filename
        }).then(image => {
            //check if images
            if (!image || image.length === 0) {
            console.log('No image found');
            }
            //image exists than delete it

            gfs.remove({
            _id: image._id,
            root: collectionName
            }).then(() => {

                Item.find().then(docs => {
                    docs.forEach((doc, i) => {
                    let imgname = doc.image.replace(/^.*[\\\/]/, '');
                    if (imgname === filename) {
        
                        Item.deleteOne({
                        image: doc.image
                        }).then(() => {
                            console.log('successfully deleted image data from files');
                            res.redirect("back");
                        }).catch(err => {
                        console.log(err);
                        });
                    }
                    });
                }).catch(err => {
                    console.log(err);
                });


            // console.log('successfully deleted image data from files');
            }).catch(err => {
            console.log(err);
            })
        }).catch(err => {
            console.log(err);
        });


        // Item.find().then(docs => {
        //     docs.forEach((doc, i) => {
        //     let imgname = doc.image.replace(/^.*[\\\/]/, '');
        //     if (imgname === filename) {

        //         Item.deleteOne({
        //         image: doc.image
        //         }).then(() => {
        //         console.log('Image subject and details successfully deleted');
        //         socket.emit('reloadPage', 'reload');
        //         }).catch(err => {
        //         console.error(err);
        //         console.log(err);
        //         });
        //     }
        //     });
        // }).catch(err => {
        //     console.error(err);
        //     console.log(err);
        // });

    })

  
  }
  

























