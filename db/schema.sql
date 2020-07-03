# Schema
DROP DATABASE IF EXISTS fridge_db;
CREATE DATABASE fridge_db;
USE fridge_db;

CREATE TABLE food (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category ENUM('vegetable', 'fruit', 'dairy', 'meat', 'fish', 'others') DEFAULT 'others',
    item VARCHAR(50) NOT NULL,
    is_rotten BOOLEAN DEFAULT FALSE,
    image_url TEXT NOT NULL
);

