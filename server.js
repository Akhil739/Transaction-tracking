const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'thy<3/Quit',
  database: 'transaction'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports=db;