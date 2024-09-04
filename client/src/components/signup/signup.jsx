import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate('/me'); // Redirect to the profile or any other page if user is logged in
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateName = (name) => {
    return name.trim() !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validation checks
    if (!validateName(name)) {
      validationErrors.name = "Name is required";
    }
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
        const response = await axios.post("https://chainforgebackend.onrender.com/register", { name, email, password });
        toast.success("Registration successful! please log in");
        setName(""); 
        setEmail(""); 
        setPassword(""); 
        navigate('/login');
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error.response?.data || error.message);
      }
    }
  };

  return (
    <section className="signup">
      <motion.div 
        className="signup-form"
        initial={{ opacity: 0, y: "-100vh" }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Burger Express</h2>
        <Avatar className="avatar" size="2xl" />

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="input-field">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="input-field">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <motion.button 
            type="submit" 
            className="signup-button"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-link">
          Already Signed Up? <a href="/login">Login In</a>
        </p>
      </motion.div>
    </section>
  );
};

export default Signup;
