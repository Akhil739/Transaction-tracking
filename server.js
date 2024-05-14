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

app.post('/submit-transaction', (req, res) => {
  const { transactionID, amount, date } = req.body;
  
  const sql = 'INSERT INTO transactions (transactionID, amount, date) VALUES (?, ?, ?)';
  db.query(sql, [transactionID, amount, date], (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Transaction submitted:', { transactionID, amount, date });
    res.send('Transaction submitted successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});