const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <title>Student Login</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: sans-serif, Arial, Helvetica, sans-serif;
        background: linear-gradient(to top right, rgb(235, 239, 235), rgb(253, 135, 245), rgb(99, 245, 255));
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .box {
        width: 700px;
        height: 500px;
        padding: 30px;
        background: linear-gradient(to top right, rgb(227, 239, 89), rgb(121, 232, 203), rgb(233, 241, 171));
        border-radius: 10px;
        box-shadow: 7px 7px 20px rgb(56, 56, 56);
      }
      h1 {
        margin-top: 100px;
        text-align: center;
        font-size: 50px;
        font-family: 'Times New Roman', Times, serif;
        font-weight: lighter;
      }
      .box input[type="text"], .box input[type="password"] {
        background: none;
        display: block;
        padding: 5px;
        margin: 20px auto;
        text-align: center;
        border: 2px solid goldenrod;
        padding: 15px;
        width: 300px;
        border-radius: 20px;
        color: rgb(0, 0, 0);
        outline: none;
        transition: width .3s;
      }
      .box input[type="text"]:hover, .box input[type="password"]:hover {
        width: 250px;
      }
      .box input[type="submit"] {
        display: block;
        margin: auto;
        background: none;
        border: 2px solid goldenrod;
        border-radius: 10px;
        transition: padding .3s;
        padding: 10px 30px;
        cursor: pointer;
      }
      .box input[type="submit"]:hover {
        color: #004068;
        background: goldenrod;
      }
    </style>
  </head>
  <body>
    <form class="box" action="/signup" method="POST">
      <h1>Student's Login</h1>
      <input type="text" name="username" placeholder="Username" required>
      <input type="text" name="collegeid" placeholder="College Id" required>
      <input type="password" name="password" placeholder="Password" required>
      <input type="submit" value="Login">
    </form>
  `);
});

// Handle form submission
app.post('/signup', (req, res) => {
  const { username, collegeid, password } = req.body;
  
  // Create a string with user data
  const userData = `Username: ${username}\nCollege ID: ${collegeid}\nPassword: ${password}\n\n`;
  
  // Append user data to a file
  fs.appendFile(path.join(__dirname, 'users.txt'), userData, (err) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Sign Up Successful!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
