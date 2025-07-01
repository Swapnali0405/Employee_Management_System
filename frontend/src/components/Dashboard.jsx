import React from "react";
import logo from "../assets/mobiliya-logo.png";

const Dashboard = () => {
  return (
    <div className="container" style={{ textAlign: "center", padding: "40px" }}>
      <img src={logo} alt="Mobiliya Logo" className="logo" style={{ height: "100px", marginBottom: "20px" }} />
      <h1>Welcome to Mobiliya Employee Management System</h1>
      <p>Manage your employees with ease and efficiency.</p>
    </div>
  );
};

export default Dashboard;