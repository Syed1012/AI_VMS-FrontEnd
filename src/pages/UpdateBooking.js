import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { jwtDecode } from "jwt-decode";

const UpdateBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
      fetchUserBookings(decodedToken.userId);
    }
  }, []);

  const fetchUserBookings = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const isBookingExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const getBookingStatus = (endDate) => {
    return isBookingExpired(endDate) ? 'Expired' : 'Upcoming';
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setOpenDialog(true);
  };

  const handleView = (booking) => {
    // Implement view functionality
    console.log('View booking:', booking);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBooking(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingBooking({ ...editingBooking, [name]: value });
  };

  const handleUpdateBooking = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/bookings/${editingBooking.id}`, editingBooking);
      const updatedBookings = bookings.map(booking => 
        booking.id === editingBooking.id ? response.data : booking
      );
      setBookings(updatedBookings);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">My Bookings</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booked Date</TableCell>
              <TableCell>Booking Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                <TableCell>{getBookingStatus(booking.endDate)}</TableCell>
                <TableCell>
                  {!isBookingExpired(booking.endDate) && (
                    <IconButton onClick={() => handleEdit(booking)}>
                      <Edit />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleView(booking)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            value={editingBooking?.startDate || ''}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={editingBooking?.endDate || ''}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="pickupLocation"
            label="Pickup Location"
            type="text"
            fullWidth
            value={editingBooking?.pickupLocation || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="dropoffLocation"
            label="Dropoff Location"
            type="text"
            fullWidth
            value={editingBooking?.dropoffLocation || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateBooking}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UpdateBooking;