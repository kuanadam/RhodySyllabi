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
    destination: path.join(__dirname, '..', 'uploads'),
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
    if (!req.file) {
        console.error('No file uploaded.');
        return res.status(400).send('No file uploaded.');
    }

    const contactData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    };

    const courseData = {
        professor: req.body.professor,
        course_prefix: req.body.course_prefix,
        course_code: req.body.course_code,
        academic_season: req.body.academic_season,
        academic_year: req.body.academic_year,
        syllabus_file: req.file.filename,
        original_filename: req.file.originalname,
        contactinfo_id: null  // This will be set after inserting the contact
    };

    try {
        // Insert contact information
        const [contactResult] = await pool.query('INSERT INTO contactinfo SET ?', contactData);
        courseData.contactinfo_id = contactResult.insertId;
        console.log('Contact information inserted successfully:', contactData);

        // Insert course information
        await pool.query('INSERT INTO course_Info SET ?', courseData);
        console.log('Course information inserted successfully:', courseData);

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

    console.log('Search query:', searchQuery);

    try {
        const [rows] = await pool.query(`
            SELECT * FROM course_Info 
            WHERE CONCAT(course_prefix, ' ', course_code) LIKE ? 
            OR professor LIKE ?`, 
            [searchQuery, searchQuery]
        );
        console.log('Search results:', rows);

        res.render('results', { results: rows, query: query });
    } catch (err) {
        console.error('Database Error:', err); // Log any errors
        res.status(500).send(err);
    }
});

// Retrieve data from the database
app.get('/data', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM course_Info');
        console.log('Data retrieved successfully:', rows);
        res.json(rows);
    } catch (err) {
        console.error('Database Error:', err); // Log any errors
        res.status(500).send(err);
    }
});

// Retrieve and display all submissions
app.get('/submissions', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM course_Info');
        console.log('All submissions retrieved successfully:', rows);
        res.render('submissions', { submissions: rows });
    } catch (err) {
        console.error('Database Error:', err); // Log any errors
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
