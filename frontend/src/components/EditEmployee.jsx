// src/components/EditEmployee.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    position: "",
    department: "",
    salary: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setForm({
          name: res.data.name || "",
          position: res.data.position || "",
          department: res.data.department || "",
          salary: res.data.salary || ""
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch employee:", err);
        setError("Failed to load employee data");
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, form);
      navigate("/employees");
    } catch (err) {
      console.error("Failed to update employee:", err);
      setError("Update failed");
    }
  };

  return (
    <div className="container">
      <h3>Edit Employee</h3>
      {loading ? (
        <p>Loading employee details...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={handleChange}
            required
          />
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            required
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default EditEmployee;
