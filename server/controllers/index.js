var models = require('../models');
var path = require('path');
var bodyParser = require('body-parser');
// module.exports.use(bodyParser.json());


var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

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
      //console.log(req.body); 
      models.messages.post(req.body)
        .then(function(data) {
          res.setHeader('Content-Type', 'application/json');
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

