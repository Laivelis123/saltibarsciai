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
    const accountType = req.body.accountType

    db.query("INSERT INTO user (name, email, password, accountType) VALUES (?, ?, ?, ?)", 
    [username, email, password, accountType], 
    (err, result) => {
        console.log(err);
    })
});

app.post('/prisijungimas', (req, res) => {
        const username = req.body.username
        const password = req.body.password
    
        db.query("SELECT * FROM user WHERE name = ? AND password = ?", 
        [username, password], 
        (err, result) => {
            if (err) {
                res.send({err: err}) 
            }

            if (result.length > 0) {
                res.send({message: "Sėkmingai prisijungta", result: result});
            } else {
                res.send({message: "Blogas vartotojo vardas / slaptažodis"});
            }
        })
});

app.listen(3001, () => {
    console.log(`Server running on port 3001`);
});