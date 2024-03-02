const express = require('express');
const mysql = require('mysql');
const nodemon = require('nodemon');
const cors = require('cors');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
});

app.post('/registracija', (req, res) => {

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    db.query("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", 
    [username, email, password], 
    (err, result) => {
        console.log(err);
    })
});

app.listen(5001, () => {
    console.log(`Server running on port 5001`);
});