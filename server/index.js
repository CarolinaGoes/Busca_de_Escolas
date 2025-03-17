const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'escolas'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.get('/address', (req, res) => {
    const query = 'SELECT name, address FROM schools LIMIT 1';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching address:', err);
            res.status(500).send('Error fetching address');
            return;
        }
        res.json(results[0]);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
