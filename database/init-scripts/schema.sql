SET TIMEZONE = 'Asia/Kolkata';

-- Create the necessary schema and extensions
CREATE EXTENSION pgcrypto;

-- Define the 'authentication' schema and table
CREATE SCHEMA IF NOT EXISTS authentication;

CREATE TABLE authentication (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone_number NUMERIC(10) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    creation_info TIMESTAMP DEFAULT Now()
);