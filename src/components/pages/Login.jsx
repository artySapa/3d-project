import React, { useState } from "react";
import axios from "axios";

const Login = (setUser) => {
  const URL = "http://localhost:8080";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${URL}/login`, {
        username,
        password,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        // Handle successful login, e.g., redirect to dashboard
        setUser(response.data.username);

        console.log("Login successful");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await axios.post(`${URL}/users/new`, {
            username, 
            password,
        })
        if(response.data.error) {
            setError(response.data.error);
        }else{
            console.log("Sign in success");
        }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
};
  const SignInForm = (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-black text-center">
          Register
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Set username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Set password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 h-10 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={(e) => {
                handleSignIn(e);
              }}
            >
              Sign in
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-center">
            <p className="text-black text-xs">Already have an account?</p>
            <button className="text-blue-500 text-xs ml-5" onClick={() => {setShowSignIn(false); setPassword(""); setUsername("")}}>Log in</button>
          </div>
        </form>
      </div>
    </div>
  );

  const LoginForm = (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-black text-center">
          Log In
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 h-10 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={(e) => {
                handleLogin(e);
              }}
            >
              Log In
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-center">
            <p className="text-black text-xs">Don't have an account?</p>
            <button className="text-blue-500 text-xs ml-5" onClick={() => {setShowSignIn(true); setPassword(""); setUsername("")}}>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        {showSignIn ? SignInForm : LoginForm}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
