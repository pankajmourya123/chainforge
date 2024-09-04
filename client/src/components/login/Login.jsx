import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
  
    // Validation checks
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 6 characters";
    }
  
    setErrors(validationErrors);
  
    // Only proceed with submission if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("https://chainforgebackend.onrender.com/login", { email, password });
  
        // Assuming response contains user data or a token
        const userData = response.data.user; // Adjust this according to your API response
  
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
  
        toast.success("Login successful!");
        
        setEmail(""); 
        setPassword(""); 
  
        // Redirect to profile page
        navigate('/me');
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error.response?.data || error.message);
      }
    }
  };
  
 

  return (
    <section className="login">
      <motion.div 
        className="login-form"
        initial={{ opacity: 0, y: "-100vh" }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          
          <input 
            type="password" 
            placeholder="Password" 
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <motion.button 
            type="submit" 
            className="login-button"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </motion.button>
        </form>

        <a href="/forgetpassword" className="login-link">
          Forgot Password?
        </a>
        
        <p className="login-text">
          New User? <a href="/signup" className="signup-link">Sign Up</a>
        </p>
      </motion.div>
    </section>
  );
};

export default Login;
