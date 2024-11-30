import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = ({ setIsAuthenticated, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { username, password });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      navigate("/tasks");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="">
      <div className=" w-80">
        <h2 className="text-4xl  font-bold text-center text-[#f84525]   mb-6 ">
          Login
        </h2>
        <hr className="h-px mb-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
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
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
            />
          </div>

          <div>
            <label
              className="block font-medium text-sm text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                  type="button"
                  className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
                >
                  {/* Add your eye icon for password visibility here */}
                </button>
              </div>
            </div>
          </div>

          <div className="block mt-4">
            <label htmlFor="remember_me" className="flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                name="remember"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              />
              <span className="ms-2 text-sm text-gray-600">Remember Me</span>
            </label>
          </div>

          <div className="flex items-center justify-between mt-4">
            {/* <a
              className="hover:underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              href="#"
            >
              Forgot your password?
            </a> */}

            <button
              type="submit"
              className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm font-mono mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#f84525]">
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
