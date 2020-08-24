
module.exports = function(values){
    const router = values.router;
    const gfs = values.gfs;
    const renderedPage = values.renderedPage;
    const Item = values.Item;
  
    router.get('/getCardData', (req, res) => {
  
      gfs.files.find().toArray().then(files => {
  
        //check if images
        if (!files || files.length === 0) {
          res.render(renderedPage, {
            files: false
          });
        } else {
          Item.find().then((cardDetails,err)=>{
            res.json(cardDetails);
          }).catch(err => {
              console.log(err);
          })
        }
      }).catch(err => {
        console.error(err);
        console.log(err);
      })
    });
  }
  