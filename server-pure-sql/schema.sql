CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  roomname varchar(255) NOT NULL
);

CREATE TABLE users (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  username varchar(255) NOT NULL
);

CREATE TABLE messages (
  objectId INT(6) AUTO_INCREMENT PRIMARY KEY,
  text varchar(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  room_id INT(6) NOT NULL,
  user_id INT(6) NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO rooms(roomname) VALUES ('lobby');
INSERT INTO rooms(roomname) VALUES ('kitchen');
INSERT INTO users(username) VALUES ('bob');
INSERT INTO users(username) VALUES ('carol');
INSERT INTO messages(text, room_id, user_id) VALUES ('sunnnnny dayyyyyss', 1, 1);
INSERT INTO messages(text, room_id, user_id) VALUES ('hey girl', 2, 2);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

