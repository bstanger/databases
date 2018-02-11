// var models = require('../models');
var path = require('path');
var bodyParser = require('body-parser');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then(function(results) {
          res.setHeader('Content-Type', 'application/json');
          res.send(results);
        }).catch(function(error) {
          console.log(error);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body)
        .then(function(results) {
          res.status(200);
          res.send(results);
        }).catch( (err) => 
          console.log(err)
        );
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {}, // a function which handles retrieving a user from the table
    post: function (req, res) {} // a function which handles adding a user from the table
  }
};

