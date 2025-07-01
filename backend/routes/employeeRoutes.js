const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const verifyToken = require("../middleware/verifyToken");

// Add new employee
router.post("/add", verifyToken, async (req, res) => {
  const { name, email, position, department, salary } = req.body;

  try {
    console.log("Received employee data:", req.body);

    const newEmployee = new Employee({ name, email, position, department, salary });
    const savedEmployee = await newEmployee.save();

    console.log("Saved employee:", savedEmployee);
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error("Add employee error:", error);
    res.status(500).json({ message: "Failed to add employee" });
  }
});

module.exports = router;
