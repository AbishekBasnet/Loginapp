const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const EmployeeModel = require('./models/Employee');
 
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employee");

//  Register route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  EmployeeModel.create({ name, email, password: hashedPassword })
    .then(user => {
      // Generate JWT token
      const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

      res.json({ status: "ok", token });
    })
    .catch(err => {
      res.json({ status: "error", message: err.message });
    });
});

//  Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email: email });

    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ status: "error", message: "Invalid password" });
    }

    //  Success
    return res.json({ status: "ok", message: "Login successful" });

  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server Started on port 3001");
});
