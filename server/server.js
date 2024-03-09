// server.js

const express = require('express');
const path = require('path');
const cors = require("cors");
const pool = require("./db")
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000; // Use the port specified in environment variables or default to 5000

// Additional API routes or other server logic can be added here
async function ensureDefaultUser() {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", ['default']);
    if (result.rows.length === 0) {
      // If no user with username 'default' exists, insert it
      await pool.query("INSERT INTO users (username, password_text) VALUES ($1, $2)", ['default', 'your_default_password']);
      console.log('Default user added successfully.');
    }
  } catch (err) {
    console.error('Error checking/adding default user:', err.message);
  }
};

ensureDefaultUser();

//Create a category
app.post("/category", async(req, res)=>{
  try {
      const {category_name} = req.body;
      const newCategory = await pool.query("INSERT INTO category (category_name) VALUES ($1) RETURNING *", [category_name]);
      res.json(newCategory.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

//Get all categories
app.get("/category", async(req, res)=>{
  try {
      const allCategories = await pool.query("SELECT * FROM category");
      res.json(allCategories.rows);
  } catch (err) {
      console.error(err.message);
  }
});

//create a question
app.post("/question", async(req, res)=>{
  try {
      console.log(req.body);
      const {category_name, owner_name, question, option1, option2, answer} = req.body;
      const newQuestion = await pool.query(
      `INSERT INTO flashcard (category_name, owner_name, question, option1, option2, answer) 
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [category_name, owner_name, question, option1, option2, answer]);
      res.json(newQuestion.rows);
  } catch (err) {
      console.error(err.message);
  }
});

//get all questions from a specific category
app.get("/question/:category", async(req, res)=>{
  try {
      const {category} = req.params;
      const questions = await pool.query("SELECT * FROM flashcard WHERE category_name = $1", [category]);
      res.json(questions.rows);
  } catch (err) {
      console.error(err.message);
  }
});

//get k questions from a specific category
app.get("/question/:category/:amount", async(req, res)=>{
  try {
      const {category,amount} = req.params;
      const questions = await pool.query("SELECT * FROM flashcard WHERE category_name = $1 ORDER BY random() LIMIT $2", [category, amount]);
      res.json(questions.rows);
  } catch (err) {
      console.error(err.message);
  }
});

// // user sign up
// app.post('/signup', async (req, res) => {
//   const { username, password } = req.body;
  
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//     // Insert the new user into the database. 
//     const newUser = await pool.query("INSERT INTO users (username, password_text) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);

//     res.status(201).json({ message: 'User created successfully', user: newUser.rows[0] });
//   } catch (error) {
//     if (error.code === '23505') { // PostgreSQL error code for unique violation
//       res.status(409).json({ message: 'Username already exists' });
//     } else {
//       console.error('Signup error:', error);
//       res.status(500).json({ message: 'Failed to create user' });
//     }
//   }
// });

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (username, password_text) VALUES ($1, $2) RETURNING *", 
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'User created successfully', user: newUser.rows[0] });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: error.message });
  }
});


// user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (userQuery.rows.length > 0) {
      const user = userQuery.rows[0];
      // Assuming 'password_text' in your database is the hashed password column
      const isValidPassword = await bcrypt.compare(password, user.password_text);

      if (isValidPassword) {
        // Login success
        res.json({ message: 'Login successful' });
      } else {
        // Password does not match
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      // No user found
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'An error occurred during the login process' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});