import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/about" element={
          <Layout>
            <div>
              <h2>About</h2>
              <p>This application manages employee data securely.</p>
            </div>
          </Layout>
        } />

        {/* Protected Routes */}
        <Route path="/employees" element={
          <ProtectedRoute><Layout><EmployeeList /></Layout></ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute><Layout><AddEmployee /></Layout></ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute><Layout><EditEmployee /></Layout></ProtectedRoute>
        } />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
