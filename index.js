const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
 
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employee");

// ✅ Register route
app.post("/register", async (req, res) => {
  EmployeeModel.create(req.body)
    .then(user => {
      res.json({ status: "ok" });
    })
    .catch(err => {
      res.json({ status: "error", message: err.message });
    });
});

// ✅ Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email: email });

    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ status: "error", message: "Invalid password" });
    }

    // ✅ Success
    return res.json({ status: "ok", message: "Login successful" });

  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server Started on port 3001");
});
