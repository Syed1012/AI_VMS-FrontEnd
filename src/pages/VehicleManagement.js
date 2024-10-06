import React, { useState } from 'react';
import {
  Container, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Box, IconButton, Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

const ManageVehicle = () => {
  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState([
    // Sample data for now
    { id: 1, vin: '1HGCM82633A123456', make: 'Toyota', model: 'Camry', year: 2020, status: 'Active', owner: 'John Doe' },
    { id: 2, vin: '1HGCM82633A654321', make: 'Ford', model: 'Mustang', year: 2019, status: 'Inactive', owner: 'Jane Smith' },
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({ vin: '', make: '', model: '', year: '', status: '', owner: '' });

  const handleOpen = (vehicle = null) => {
    if (vehicle) {
      setVehicleForm(vehicle);
      setSelectedVehicle(vehicle.id);
    } else {
      setVehicleForm({ vin: '', make: '', model: '', year: '', status: '', owner: '' });
      setSelectedVehicle(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFormChange = (e) => {
    setVehicleForm({ ...vehicleForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (selectedVehicle) {
      // Update the vehicle
      setVehicles(vehicles.map(v => (v.id === selectedVehicle ? { ...vehicleForm, id: selectedVehicle } : v)));
    } else {
      // Add new vehicle
      setVehicles([...vehicles, { ...vehicleForm, id: vehicles.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: '15px' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Manage Vehicles
        </Typography>

        {/* Add New Vehicle Button and Search */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => handleOpen()}
              sx={{ bgcolor: '#3d52a0', '&:hover': { bgcolor: '#2e3d6c' } }}
            >
              Add New Vehicle
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} textAlign="right">
            <TextField
              placeholder="Search Vehicle..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
              sx={{ width: '100%', maxWidth: 300 }}
            />
          </Grid>
        </Grid>

        {/* Vehicle DataGrid */}
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={vehicles}
            columns={[
              { field: 'vin', headerName: 'VIN', width: 200 },
              { field: 'make', headerName: 'Make', width: 150 },
              { field: 'model', headerName: 'Model', width: 150 },
              { field: 'year', headerName: 'Year', width: 100 },
              { field: 'status', headerName: 'Status', width: 150 },
              { field: 'owner', headerName: 'Owner', width: 200 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                renderCell: (params) => (
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(params.row)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(params.row.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ),
              },
            ]}
            pageSize={5}
          />
        </Box>

        {/* Add/Edit Vehicle Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
          <DialogContent>
            <TextField
              label="VIN"
              name="vin"
              value={vehicleForm.vin}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Make"
              name="make"
              value={vehicleForm.make}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Model"
              name="model"
              value={vehicleForm.model}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              name="year"
              value={vehicleForm.year}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              name="status"
              value={vehicleForm.status}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Owner"
              name="owner"
              value={vehicleForm.owner}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleSave} color="primary">{selectedVehicle ? 'Update' : 'Save'}</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default ManageVehicle;
