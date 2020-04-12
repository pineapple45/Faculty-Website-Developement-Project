const express = require('express');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

module.exports = function(value){

  let router = value.router;
  let Item = value.Item;
  let renderedPage = value.renderedPage;

  router.get("/", function(req, res) {

    Item.find(function(err, foundItems) {
      if (err) {
        console.log(err);
      } else {
        if (foundItems.length === 0) {

          res.render(renderedPage, {
            newItems: false,
          });
          // res.redirect("back");
        } else {
          res.render(renderedPage, {
            newItems: foundItems,
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

  });

}
