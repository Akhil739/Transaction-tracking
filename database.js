const mysql = require('mysql2');
//import mysql from 'mysql2';
//const dotenv = require('dotenv');
//import dotenv from 'dotenv';
//dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'thy<3/Quit',
  database: 'transaction'

}).promise();

// Transaction functions
export async function getTransactions() {
  const [rows] = await pool.query("SELECT * FROM Transactions");
  return rows;
}

export async function getTransaction(id) {
  const [rows] = await pool.query("SELECT * FROM Transactions WHERE transaction_id = ?", [id]);
  return rows[0];
}

export async function createTransaction(amount, date) {
  const [result] = await pool.query("INSERT INTO Transactions (amount, date) VALUES (?, ?)", [amount, date]);
  const id = result.insertId;
  return getTransaction(id);
}

// Similar functions for Users, Categories, Roles, etc.
