import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext}from "../../context/AuthContext "; // Fixed typo in import
import axios from "axios";
import "./register.css"; // Changed to register.css (create this)

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    phonoNo:"",
    contry:"",
    img:"",city:"",
  });
  const [showPassword, setShowPassword] = useState(false);
  

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validateForm = () => {
    const { username, email, password } = credentials;
    if (!username || !email || !password ) {
      dispatch({
        type: "LOGIN_FAILURE", // We'll update this in AuthContext
        payload: "Please fill in all fields",
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Please enter a valid email",
      });
      return false;
    }
    
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", credentials, {
        withCredentials: true,
        timeout: 5000,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data }); // Update to REGISTER_SUCCESS
      navigate("/login"); // Redirect to home after successful registration
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data?.message || "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="rInput"
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          className="rInput"
          disabled={loading}
        />
        < div className="passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="rInput"
            disabled={loading}
          />
          
           
           <input
          type="text"
          placeholder="PhoneNo"
          id="phonoNo"
          value={credentials.phonoNo}
          onChange={handleChange}
          className="rInput"
          disabled={loading}
        />
           <input
          type="text"
          placeholder="Country"
          id="contry"
          value={credentials.contry}
          onChange={handleChange}
          className="rInput"
          disabled={loading}
        />
           <input
          type="text"
          placeholder="City"
          id="city"
          value={credentials.city}
          onChange={handleChange}
          className="rInput"
          disabled={loading}
        />
        
         </div>
        <button
          disabled={loading}
          onClick={handleClick}
          className="rButton"
        >Register</button>
        {error && (
          <span className="error">
            {typeof error === "string" ? error : error.message}
          </span>
        )}
        <p>
          Already have an account?{" "}
          <span className="loginLink" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;