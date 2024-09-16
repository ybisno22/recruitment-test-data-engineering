CREATE DATABASE IF NOT EXISTS people_places_db;

USE people_places_db;

-- Only for development
DROP TABLE IF EXISTS places;
DROP TABLE IF EXISTS people;

CREATE TABLE IF NOT EXISTS places (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    city VARCHAR(255) NOT NULL,
    county VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Places_City UNIQUE (city)
);

CREATE TABLE IF NOT EXISTS people (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    given_name VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    places_of_birth_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (places_of_birth_id) REFERENCES places(id)
);
