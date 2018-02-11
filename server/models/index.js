var db = require('../db');
var con = db.connection();

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        con.query('SELECT * FROM messages;', function(err, results) {
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
              }).then(module.exports.rooms.get()
                .then(function(roomResults) {
                  data.results.map( messageObj => {
                    var roomId = messageObj.room_id;
                    var matchingRoom = roomResults.find((tup) => { 
                      return tup.id === roomId;
                    });
                    messageObj.roomname = matchingRoom.roomname;
                  });
                }).then(function() {
                  resolve(data);
                }).catch(function(err) {
                  reject(err);
                })
              );
          }
        });
      });
    }, // a function which produces all the messages
    post: function (reqBody) {
      var userIdInput;
      var roomIdInput;
      return new Promise(function(resolve, reject) {
        module.exports.users.post(reqBody.username)
          .then(function(userId) {
            userIdInput = userId[0].id;
            // post to users, return id
          }).then(module.exports.rooms.post(reqBody.roomname)
            .then(function(roomId) {
              roomIdInput = roomId[0].id;
              // post to rooms, return id
            }).then(function() {
              // query to messages table, insert message
              var queryInsertMsg = `INSERT INTO messages(text, room_id, user_id) VALUES ('${reqBody.text}', ${roomIdInput}, ${userIdInput});`;
              con.query(queryInsertMsg);
              resolve();
            }).catch(function(err) {
              reject(err);
            }));
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
      return new Promise(function(resolve, reject) {
        var queryUniqName = `INSERT INTO users(username) \
        SELECT * FROM (SELECT '${username}') AS tmp \
        WHERE NOT EXISTS \
        (SELECT username from users WHERE username = '${username}') \
        LIMIT 1;`;
        var queryUserId = `SELECT id FROM users WHERE username = '${username}';`;
        con.query(queryUniqName);
        con.query(queryUserId, function(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
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
    post: function(roomname) {
      return new Promise(function(resolve, reject) {
        var queryUniqRoom = `INSERT INTO rooms(roomname) \
        SELECT * FROM (SELECT '${roomname}') AS tmp \
        WHERE NOT EXISTS (SELECT roomname from rooms WHERE roomname = '${roomname}') \
        LIMIT 1;`;
        var queryRoomId = `SELECT id FROM rooms WHERE roomname = '${roomname}';`;
        con.query(queryUniqRoom);
        con.query(queryRoomId, function(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
  }
};

