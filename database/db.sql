CREATE DATABASE websave;

USE websave;

-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

DESCRIBE users;

-- CREATE FIRST USER
INSERT INTO users (username, password, fullname) VALUES ("test", "test", "MyTest");

-- LINKS TABLE
CREATE TABLE links(
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(160) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY user_id (user_id),
    CONSTRAINT user_fk
    FOREIGN KEY (user_id) 
    REFERENCES users(id)
);

DESCRIBE links;