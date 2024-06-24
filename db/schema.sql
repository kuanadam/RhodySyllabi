CREATE DATABASE RhodySyllabi;

CREATE TABLE contactinfo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE course_Info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contactinfo_id INT,
    professor VARCHAR(255) NOT NULL,
    course_prefix VARCHAR(10) NOT NULL,
    course_code VARCHAR(10) NOT NULL,
    academic_season VARCHAR(50) NOT NULL,
    academic_year INT NOT NULL,
    syllabus_file VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    FOREIGN KEY (contactinfo_id) REFERENCES contactinfo(id) ON DELETE CASCADE
);
