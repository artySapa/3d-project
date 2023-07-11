import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from 'react-redux';
import { login } from '../../../redux/actions';

import { useNavigate } from "react-router-dom";

import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';

const Login = () => {
    const dispatch = useDispatch();

  const URL = "http://localhost:8080";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const [success, setSuccess] = useState("");
  const [profImage, setProfImage] = useState("");

  const navigateTo = useNavigate();

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
       
        setSuccess("Successfully logged in");
        setUsername("");
        setPassword("");
        console.log("Login successful");


        dispatch(login({ username: response.data.username, picture: response.data.picture }));

        setTimeout(() => {navigateTo('/profile')}, 1000);
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
        if (profImage) {
            const requestData = {
              username: username,
              password: password,
              picture: profImage,
            };
      
      const response = await axios.post(`${URL}/users/new`, requestData);
  
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setShowSignIn(false);
        setUsername("");
        setPassword("");
    
        setSuccess("Successfully signed in. You will be redirected in a second.");
        setTimeout(() => {
          navigateTo("/login");
          setSuccess("");
        }, 1000);
        console.log("Sign in success");
      }
    }} catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

//   const fileToString = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
  
//       reader.onload = (event) => {
//         const result = event.target.result;
//         resolve(result);
//       };
  
//       reader.onerror = (error) => {
//         reject(error);
//       };
  
//       reader.readAsDataURL(file);
//     });
//   };
  
  const SignInForm = (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-black text-center">
          Register
        </h2>
        <form className="space-y-6" onSubmit={handleSignIn}>
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
            <label
             
              className="block text-sm font-medium text-gray-700"
            >
              Set Avatar
            </label>
            {/* <input
              id="profPicture"
              type="file"
          
              required
              onChange={(e) => setProfImage(e.target.files[0])}
              className="mt-1 p-2 h-10 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            /> */}
            <InputText
             type="file" 
             accept="/image/*"
             onChange={(e) => {
                const file = e.target.files[0];
                if(file && file.type.substring(0,5) === "image"){
                    setProfImage(file);
                }else{
                    setProfImage(null);
                }
             }}
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
          {success && <p className="text-green-500 text-sm align-center text-center">{success}</p>}
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
