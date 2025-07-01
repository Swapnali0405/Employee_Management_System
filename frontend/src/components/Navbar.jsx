import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/mobiliya-logo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="brand">Employee Manager</span>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/employees">Add Employee</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
