import mysql from 'mysql2/promise';

// export const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@Kalash._1",
    database: "irctc2",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Run in MySQL Workbench

// CREATE DATABASE irctc2;
// USE irctc2;


// CREATE TABLE Users (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     verify BOOLEAN NOT NULL DEFAULT 0,
//     admin BOOLEAN NOT NULL DEFAULT 0,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );

// CREATE TABLE tokens (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     token2 VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     INDEX idx_created_at (created_at)
// );

// CREATE TABLE train (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     source VARCHAR(255) NOT NULL,
//     destination VARCHAR(255) NOT NULL,
//     num_of_trains INT NOT NULL,
//     num_of_seats INT NOT NULL,
//     departure_time TIME,
//     arrival_time TIME,
//     train_number VARCHAR(50) UNIQUE NOT NULL,
//     train_type VARCHAR(50),
//     status ENUM('Active', 'Inactive', 'Under Maintenance') DEFAULT 'Active',
//     last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );
