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
          con.query('select * from messages;', function(err, results) {
            if (err) {
              reject(err);
            } else {
              var data = {};
              data.results = results;
  
              module.exports.users.get()
                .then(function(userResults) {
                  data.results.map( messageObj => {
                    var userId = messageObj.user_id;
                    var matchingUser = userResults.find((tup) => { 
                      return tup.id === userId;
                    });
                    messageObj.username = matchingUser.username;
                  });
                  //console.log(data.results);
                }).catch(function(err) {
                  reject(err);
                }).then(module.exports.rooms.get()
                  .then(function(roomResults) {
                    //console.log(roomResults);
                    data.results.map( messageObj => {
                      var roomId = messageObj.room_id;
                      var matchingRoom = roomResults.find((tup) => { 
                        return tup.id === roomId;
                      });
                      messageObj.roomname = matchingRoom.roomname;
                    });
                    //console.log(data.results);
                  }).catch(function(err) {
                    reject(err);
                  }).then(function() {
                    console.log(data);
                    resolve(data);
                  })
                );
            }
          });
        });
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      return new Promise(function(resolve, reject) {
        var con = db.connection();
        con.connect(function(err) {
          if (err) {
            reject(err);
          }
          con.query('SELECT * FROM users', function(err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      });
    }, // a function which produces all the users
    post: function () {} // a function which can be used to insert a user into the database
  },

  rooms: {
    get: function() {
      return new Promise(function(resolve, reject) {
        var con = db.connection();
        con.connect(function(err) {
          if (err) {
            reject(err);
          }
          con.query('SELECT * FROM rooms', function(err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      });
    },
    post: function() {
    },
  }
};

