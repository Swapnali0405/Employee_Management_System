import React from "react";
import Navbar from "./Navbar";
import "../styles/Auth.css";
import "../styles/Navbar.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container">
        {children}
      </main>
    </>
  );
};

export default Layout;