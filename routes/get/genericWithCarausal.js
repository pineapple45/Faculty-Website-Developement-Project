const {
  ensureAuthenticated
} = require('../../config/auth');

module.exports = function(value){
  const router = value.router;
  const Item = value.Item;
  const renderedPage = value.renderedPage;
  const collectionName = value.collectionName;
  const gfs = value.gfs;

  router.get("/", function(req, res) {

      gfs.files.find().toArray().then(files =>{
        //check if images
       if(!files || files.length === 0)
       {
           // res.render('researchInterest', {files: false});

           Item.find(function(err, foundItems) {
             if (err) {
               console.log(err);
             } else {
               if (foundItems.length === 0) {

                 res.render(renderedPage, {
                   newItems: false,
                   files: false
                 });
                 // res.redirect("back");
               } else {
                 res.render(renderedPage, {
                   newItems: foundItems,
                   files: false
                 });
               }
             }
           }).sort({
             pos: 1
           }).exec(function(err, docs) {
             if(err)
             {
               console.log(err);
             }

           });
       }else{

         Item.find(function(err, foundItems) {
           if (err) {
             console.log(err);
           } else {
             if (foundItems.length === 0) {

               res.render(renderedPage, {
                 newItems: false,
                 files: files
               });
             } else {
               res.render(renderedPage, {
                 newItems: foundItems,
                 files: files
               });
             }
           }
         }).sort({
           pos: 1
         }).exec(function(err, docs) {
           if(err)
           {
             console.log(err);
           }

         });
       }
      }).catch(err =>{
        console.error(err);
        console.log(err);
      });
  });
}
