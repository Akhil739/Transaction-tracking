const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
const db = require('./server');

app.post("/transactions", async (req, res) => {
    const { amount, date } = req.body;
    try{
        const transaction = await createTransaction(amount, date);
        res.status(201).send(transaction);
    }catch(err){
        console.log(err)
    }
   
    res.json({
        msg:"hello"
    })
});

app.get("/transactions/:id", async (req, res) => {
    const id = req.params.id;
    const transaction = await getTransaction(id);
    res.send(transaction);
});

app.post("/users", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await createUser(username, email, password);
    res.status(201).send(user);
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user);
});

app.post("/categories", async (req, res) => {
    const { category_name } = req.body;
    const category = await createCategory(category_name);
    res.status(201).send(category);
});

app.get("/categories/:id", async (req, res) => {
    const id = req.params.id;
    const category = await getCategory(id);
    res.send(category);
});

app.post("/roles", async (req, res) => {
    const { role_name } = req.body;
    const role = await createRole(role_name);
    res.status(201).send(role);
});

app.get("/roles/:id", async (req, res) => {
    const id = req.params.id;
    const role = await getRole(id);
    res.send(role);
});

app.post("/transactions/:transactionId/categories/:categoryId", async (req, res) => {
    const { transactionId, categoryId } = req.params;
    await assignCategoryToTransaction(transactionId, categoryId);
    res.status(200).send('Category assigned to transaction');
});

app.post("/users/:userId/roles/:roleId", async (req, res) => {
    const { userId, roleId } = req.params;
    await assignRoleToUser(userId, roleId);
    res.status(200).send('Role assigned to user');
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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

async function getTransactions() {
    const [rows] = await db.query("SELECT * FROM Transactions");
    return rows;
  }
  
 async function getTransaction(id) {
    const [rows] = await db.query("SELECT * FROM Transactions WHERE transaction_id = ?", [id]);
    return rows[0];
  }
  
  async function createTransaction(amount, date) {
    const [result] = await db.query("INSERT INTO Transactions (amount, date) VALUES (?, ?)", [amount, date]);
    const id = result.insertId;
    return getTransaction(id);
  }