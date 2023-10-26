SET TIMEZONE = 'Asia/Kolkata';

-- Create the necessary schema and extensions
CREATE EXTENSION pgcrypto;

-- Define the 'authentication' schema and table
CREATE SCHEMA IF NOT EXISTS authentication;


CREATE TABLE todos (
    id VARCHAR(225) PRIMARY KEY,
    email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
)

-- INSERT INTO todos VALUES (
--     '45',
--     'test@gmail.com',
--     'Hello',
--     45,
--     '22-10-2023'
-- )