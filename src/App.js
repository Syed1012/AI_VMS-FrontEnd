import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Features from "./components/Features";
import Login from "./pages/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Booking from './pages/Booking';
import { Box } from "@mui/material"; // Import Box from MUI
import Register from './pages/Register';
import RegisterVehicle from "./pages/RegisterVehicle";
import Profile from './pages/Profile';
import VehicleManagement from './pages/VehicleManagement';
import VehicleMaintenance from './pages/VehicleMaintenance';
import Reports from './pages/Reports';
import UserDashboard from './pages/UserDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ChatBot from "./components/ChatBot";
import ProtectedRoute from './services/ProtectedRoute'; // Import ProtectedRoute
import UpdateVehicleStatus from './pages/UpdateVehicleStatus';
import UpdateBooking from './pages/UpdateBooking';
import Maintenance from './pages/Maintenance';
import BookMaintenance from './pages/BookMaintenance';
import UpdateMaintenance from './pages/UpdateMaintenance';
import UserAIDashboard from './pages/UserAIDashboard';

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Router>
        <Header />
        <Box flexGrow={1}>
          <Routes>
            
            
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />


            {/* Protected Routes */}
            <Route path="/user-dashboard" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/booking" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path="/registervehicle" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <RegisterVehicle />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/updatestatus" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <UpdateVehicleStatus />
              </ProtectedRoute>
            } />
            <Route path="/updatebooking" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <UpdateBooking />
              </ProtectedRoute>
            } />
            <Route path="/maintenance" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <Maintenance />
              </ProtectedRoute>
            } />
            <Route path="/bookmaintenance" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <BookMaintenance />
              </ProtectedRoute>
            } />
            <Route path="/updatemaintenance" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <UpdateMaintenance />
              </ProtectedRoute>
            } />
            <Route path="/user-aipredictionsdashboard" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <UserAIDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={[1]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/vehicle-management" element={
              <ProtectedRoute allowedRoles={[1]}>
                <VehicleManagement />
              </ProtectedRoute>
            } />
            <Route path="/vehicle-maintenance" element={
              <ProtectedRoute allowedRoles={[1]}>
                <VehicleMaintenance />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={[1]}>
                <Reports />
              </ProtectedRoute>
            } />
          </Routes>
        </Box>
        <ChatBot />
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
