import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies from POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Serve the HTML form
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'formsubmisson.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
    const formData = {
        course: req.body.course,
        professor: req.body.professor,
        syllabi_File: req.body.syllabi_File,
        syllabi_Date: req.body.syllabi_Date
    };

    console.log('Form Data:', formData); // Log form data

    try {
        const [result] = await pool.query('INSERT INTO rhodydatabase SET ?', formData);
        console.log('Database Result:', result); // Log result from the database
        res.redirect('/'); // Redirect back to the home page
    } catch (err) {
        console.error('Database Error:', err); // Log any errors
        res.status(500).send('Error storing data in database.');
    }
});

// Retrieve data from the database
app.get('/data', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rhodydatabase');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
