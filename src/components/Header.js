import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode"; // To decode JWT token
import "../styles/Header.css";
import logo from "../resources/logo.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // State to store user role
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Decode the token to get the role
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken?.role || null;
        setUserRole(role); // Save the role in state
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsLoggedIn(!!updatedToken);
      if (updatedToken) {
        try {
          const decodedToken = jwtDecode(updatedToken);
          const role = decodedToken?.role || null;
          setUserRole(role);
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      } else {
        setUserRole(null); // Reset the role when token is removed
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleHomeClick = () => {
    if (isLoggedIn) {
      if (userRole === 1) {
        navigate("/dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      navigate("/");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProtectedLink = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      toast.error("Please login to continue", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login");
    }
  };

  const handleBookingClick = () => {
    handleProtectedLink("/booking");
  };

  const handleUpdateBookingClick = () => {
    handleProtectedLink("/updatebooking");
  };

  const handleRegisterVehicleClick = () => {
    handleProtectedLink("/registervehicle");
  };

  const handleupdateVehicleStatusClick = () => {
    handleProtectedLink("/updatestatus");
  };

  const handleMaintenanceClick = () => {
    handleProtectedLink("/maintenance");
  };

  return (
    <div
      className="header-container"
      style={{ borderRadius: "40px", marginTop: "30px" }}
    >
      <nav className="nav-links">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo-img"
            onClick={handleLogoClick}
            style={{
              cursor: "pointer",
            }}
          />
          <h1
            onClick={handleLogoClick}
            style={{
              color: "black",
              fontFamily: "Times New Roman",
              fontStyle: "italic",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            AI Vehicle Management System
          </h1>
        </div>
        <div>
          <button
            onClick={handleHomeClick}
            style={{
              fontFamily: "Times New Roman",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              fontSize: "x-large",
              fontWeight: "bold",
            }}
          >
            Home
          </button>
          <Link to="/features" style={{ fontFamily: "Times New Roman" }}>
            Features
          </Link>

          {/* Booking Dropdown */}
          <div className="dropdown">
            <button
              className="dropbtn"
              style={{ fontFamily: "Times New Roman" }}
            >
              Booking
            </button>
            <div className="dropdown-content">
              <button onClick={handleBookingClick}>Book Vehicle</button>
              <button onClick={handleUpdateBookingClick}>
                Update Vehicle Booking
              </button>
              <button onClick={handleRegisterVehicleClick}>
                Register Vehicle
              </button>
              <button onClick={handleupdateVehicleStatusClick}>
                Update Vehicle status
              </button>
              <button onClick={handleMaintenanceClick}>Maintenance</button>
            </div>
          </div>

          {/* Conditionally render Services dropdown based on role */}
          {isLoggedIn && userRole === 1 && (
            <div className="dropdown">
              <button
                className="dropbtn"
                style={{ fontFamily: "Times New Roman" }}
              >
                Services
              </button>
              <div className="dropdown-content">
                <Link to="/vehicle-management">Manage Vehicles</Link>
                <Link to="/vehicle-maintenance">Maintenance</Link>
                <Link to="/reports">Reports</Link>
              </div>
            </div>
          )}

          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="dropbtn"
                style={{ fontFamily: "Times New Roman" }}
              >
                Profile
              </button>
              <div className="dropdown-content">
                <Link to="/profile">Edit Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" style={{ fontFamily: "Times New Roman" }}>
              Login/Signup
            </Link>
          )}
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
}

export default Header;
