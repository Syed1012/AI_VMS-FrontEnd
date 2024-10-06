import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";  // Import JWT decode library
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      if (res.data && res.data.success) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("storage"));
        console.log("JWT Token:", token);

        // Decode the token to get user role
        const decoded = jwtDecode(token);
        const userRole = decoded.role; // Assuming role is stored in the token as 'role'

        // Check the user role and navigate accordingly
        if (userRole === 1) {
          // Admin
          navigate("/dashboard");
        } else if (userRole === 2) {
          // Regular User
          navigate("/user-dashboard");
        }

        // Show success notification after navigation
        setTimeout(() => {
          toast.success("Logged in successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }, 100);
      } else {
        const errorMessage = res.data.message || "Login failed";
        console.error("Error:", errorMessage);

        if (errorMessage.includes("Email and password are required")) {
          toast.error("Please enter email and password");
        } else if (errorMessage.includes("User not found")) {
          toast.error("User not found. Please register.");
        } else if (errorMessage.includes("Invalid password")) {
          toast.error("Invalid password. Please try again.");
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="login-form">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Don't have an account?
          <Link to="/register" className="MovetoOther">
            {" "}
            Signup
          </Link>
        </p>
        <p>
          <Link to="/forgot-password" className="MovetoOther">
            {" "}
            Forgot Password?
          </Link>
        </p>
        <input type="submit" value="Submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};

export default Login;
