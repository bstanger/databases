var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        var con = db.connection();
        con.connect(function(err) {
          if (err) {
            reject(err);
          }
          con.query('SELECT * FROM messages', function(err, results) {
            if (err) {
              reject(err);
            } else {
              var data = {};
              data.results = results;
              resolve(data);
            }
          });
        });
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {}, // a function which produces all the users
    post: function () {} // a function which can be used to insert a user into the database
  }
};

