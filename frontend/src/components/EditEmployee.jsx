// src/components/EditEmployee.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    position: "",
    department: "",
    salary: ""
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees").then((res) => {
      const emp = res.data.find((e) => e._id === id);
      if (emp) {
        setForm({
          name: emp.name,
          position: emp.position,
          department: emp.department,
          salary: emp.salary
        });
      }
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/employees/${id}`, form);
    navigate("/employees");
  };

  return (
    <div className="container">
      <h3>Edit Employee</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />
        <input
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          placeholder="Position"
        />
        <input
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          placeholder="Department"
        />
        <input
          value={form.salary}
          type="number"
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          placeholder="Salary"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;
