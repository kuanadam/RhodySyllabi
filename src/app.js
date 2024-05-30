import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies from POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..' ,'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('syllabi_File');


// Serve the homepage with the search form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'homepage.html'));
});

// Serve the form submission page
app.get('/formsubmission.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'formsubmission.html'));
});

// Handle form submission
app.post('/submit', upload, async (req, res) => {
    // Check if the file was uploaded
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const formData = {
        course: req.body.course,
        professor: req.body.professor,
        syllabi_File: req.file.filename, // Use req.file.filename for the uploaded file
        original_filename: req.file.originalname,
        syllabi_Date: req.body.syllabi_Date
    };

    console.log('Form Data:', formData); // Log form data

    try {
        const [result] = await pool.query('INSERT INTO rhodydatabase SET ?', formData);
        console.log('Database Result:', result); // Log result from the database
        res.redirect('/formsubmission.html');
    } catch (err) {
        console.error('Database Error:', err); // Log any errors
        res.status(500).send('Error storing data in database.');
    }
});

// Handle search queries and render results page
app.get('/search', async (req, res) => {
    const query = req.query.query;
    const searchQuery = `%${query}%`;

    try {
        const [rows] = await pool.query('SELECT * FROM rhodydatabase WHERE course LIKE ?', [searchQuery]);
        res.render('results', { results: rows, query: query });
    } catch (err) {
        console.error('Database Error:', err); // Log any errors
        res.status(500).send(err);
    }
});

// Retrieve data from the database
app.get('/data', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rhodydatabase');
        res.json(rows);
    } catch (err) {
        console.error('Database Error:', err); // Log any errors
        res.status(500).send(err);
    }
});

// Retrieve and display all submissions
app.get('/submissions', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rhodydatabase');
        res.render('submissions', { submissions: rows });
    } catch (err) {
        console.error('Database Error:', err); // Log any errors
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
