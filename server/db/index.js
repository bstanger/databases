var Sequelize = require('sequelize');
var db = new Sequelize('chats', 'student', 'student');

///////////

var Users = db.define('users', {
  username: Sequelize.STRING
});

var Rooms = db.define('rooms', {
  roomname: Sequelize.STRING
});

var Messages = db.define('messages', {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

///////////

Users.hasMany(Messages);
Rooms.hasMany(Messages);
Messages.belongsTo(Users);
Messages.belongsTo(Rooms);

Users.sync();
Rooms.sync();
Messages.sync();

exports.Users = Users;
exports.Rooms = Rooms;
exports.Messages = Messages;
