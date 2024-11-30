import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { username, password });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register w-80">
     
      <h2 className="text-4xl  font-bold text-center text-[#f84525]   mb-6 ">
      Register Here
        </h2>
        <hr className="h-px mb-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block font-medium text-sm text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#f84525] focus:border-transparent"
          />
        </div>

        <div>
          <label
            className="block font-medium text-sm text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full  rounded-md py-2.5 px-4 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#f84525] focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
        >
          Register
        </button>
      
      
      </form>
      <p className="text-sm font-mono mt-4">alredy have an account? <Link to="/login" className="text-[#f84525]">Login</Link> </p>
    </div>
  );
};

export default Register;
