# Schema
DROP DATABASE IF EXISTS fridge_db;
CREATE DATABASE fridge_db;
USE fridge_db;

CREATE TABLE food (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category ENUM('vegetable', 'fruit', 'dairy', 'meat', 'seafood', 'others') DEFAULT 'others',
    item VARCHAR(50) NOT NULL,
    is_rotten BOOLEAN DEFAULT FALSE,
    quantity INT DEFAULT 5,
    image_url TEXT NOT NULL
);

CREATE TABLE fridge (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category ENUM('vegetable', 'fruit', 'dairy', 'meat', 'seafood', 'others') DEFAULT 'others',
    item VARCHAR(50) NOT NULL,
    is_rotten BOOLEAN DEFAULT FALSE,
    quantity INT DEFAULT 5,
    image_url TEXT NOT NULL
);