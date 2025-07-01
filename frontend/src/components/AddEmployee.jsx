import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/employees/add", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/employees");
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Error adding employee");
    }
  };

  return (
    <div className="container">
      <h3>Add New Employee</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
        <input type="number" placeholder="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
