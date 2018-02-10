var db = require('../db');
var con = db.connection();

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
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
              }).catch(function(err) {
                reject(err);
              }).then(module.exports.rooms.get()
                .then(function(roomResults) {
                  data.results.map( messageObj => {
                    var roomId = messageObj.room_id;
                    var matchingRoom = roomResults.find((tup) => { 
                      return tup.id === roomId;
                    });
                    messageObj.roomname = matchingRoom.roomname;
                  });
                }).catch(function(err) {
                  reject(err);
                }).then(function() {
                  //console.log(data);
                  resolve(data);
                })
              );
          }
        });
      });
    }, // a function which produces all the messages
    post: function (reqBody) {
      console.log(reqBody);
      return new Promise(function(resolve, reject) {
        module.exports.users.post(reqBody.username)
          .then(
          ).catch(
          );
        // post to users, return id
        // post to rooms, return id
        // query to messages table, insert message
        resolve();
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {
      return new Promise(function(resolve, reject) {
        con.query('SELECT * FROM users', function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }, // a function which produces all the users
    post: function (username) {
      console.log(username);
      return new Promise(function(resolve, reject) {
        var queryUniqName = `INSERT INTO users(username) SELECT * FROM (SELECT '${username}') AS tmp WHERE NOT EXISTS (SELECT username from users WHERE username = '${username}') LIMIT 1;`;
        con.query(queryUniqName, function(err) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } // a function which can be used to insert a user into the database
  },

  rooms: {
    get: function() {
      return new Promise(function(resolve, reject) {
        con.query('SELECT * FROM rooms', function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    },
    post: function() {
    },
  }
};

