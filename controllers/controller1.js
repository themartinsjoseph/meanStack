//Controllers in AngularJS serve two primary purposes:+
  //++Initialize the data used for the view they are attached to
  //++Contain the primary code to respond to user events, such as when a user clicks on a button
//A controller is a JS constructor function that is instantiated by the ng-controller directive.


//Requirements & Vars
var express = require('express');
var Recipe = require('../models/recipe');
var router = express.Router();

//Routers
router.route('/')
  .get(function(req, res) {
    Recipe.find(function(err, recipes) {
      if (err) return res.status(500).send(err);

      return res.send(recipes);
    });
  })
  .post(function(req, res) {
    Recipe.create(req.body, function(err, recipe) {
      if (err) return res.status(500).send(err);

      return res.send(recipe);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
      if (err) return res.status(500).send(err);

      return res.send(recipe);
    });
  })
  .put(function(req, res) {
    Recipe.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    });
  })
  .delete(function(req, res) {
    Recipe.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    });
  });

//Listener
module.exports = router;