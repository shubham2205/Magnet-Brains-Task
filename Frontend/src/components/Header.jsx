import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header>
      <nav className="px-20 py-6 gap-8 flex justify-end items-center">
        {isAuthenticated ? (
          <>
            <Link to="/tasks">Tasks</Link>
            <Link to="/tasks/new">Create Task</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`px-6 py-3 rounded-lg shadow-xl ${
                location.pathname === "/login"
                  ? "bg-[#f84525] text-white"
                  : "bg-white text-[#f84525]"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`px-6 py-3 rounded-lg shadow-xl ${
                location.pathname === "/register"
                  ? "bg-[#f84525] text-white"
                  : "bg-white text-[#f84525]"
              }`}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
