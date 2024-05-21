CREATE DATABASE RhodySyllabi;

CREATE TABLE rhodydatabase(
entry_id INT AUTO_INCREMENT PRIMARY KEY,
professor VARCHAR(50),
course VARCHAR(50),
syllabi_File VARCHAR(500),
syllabi_Date DATE
);

INSERT INTO rhodydatabase(professor, course, syllabi_File, syllabi_Date)
values
('Sarah Brown', 'CSC 392', 'file', '2024-05-14');

