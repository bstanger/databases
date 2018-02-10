CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE users (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE messages (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  text varchar(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  room_id INT(6) NOT NULL,
  user_id INT(6) NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

