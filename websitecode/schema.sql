CREATE DATABASE RhodySyllabi;

CREATE TABLE rhodyDatabase(
entry_id INT,
professor VARCHAR(50),
course VARCHAR(50),
syllabi_File VARCHAR(50),
syllabi_Date DATE
);

INSERT INTO rhodyDatabase(professor, course, syllabi_File, syllabi_Date)
values
('Sarah Brown', 'CSC 392', 'file', '2024-05-14');

