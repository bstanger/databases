var db = require('../db');
// var con = db.connection();


// var connectToDB = () => {
//   return new Promise(function(resolve, reject) {
//     con.connect(function(err) {
//       if (err) {
//         reject(err);
//       }
//     }
//   }); 
// };

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        var con = db.connection();
        con.connect(function(err) {
          if (err) {
            reject(err);
          }
          con.query('select * from messages INNER JOIN users ON messages.user_id = users.id;', function(err, results) {
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
    get: function (userId) {
      // return new Promise(function(resolve, reject) {
      //   con.connect(function(err) {
      //     if (err) {
      //       reject(err);
      //     }
      //     con.query('SELECT name FROM users WHERE id = ' + userId, function(err, results) {
      //       if (err) {
      //         reject(err);
      //       } else {
      //         resolve(results);
      //       }
      //     });
      //   });
      // });
    }, // a function which produces all the users
    post: function () {} // a function which can be used to insert a user into the database
  }
};

