import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Tooltip,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Dummy Data
const dummyRecords = [
  {
    id: 1,
    description: "Oil change and tire rotation",
    maintenanceDate: "2024-09-10",
    cost: 150.0,
    maintenanceType: "Routine",
    vehicle: { id: "ABC123" },
  },
  {
    id: 2,
    description: "Brake pad replacement",
    maintenanceDate: "2024-08-25",
    cost: 300.0,
    maintenanceType: "Urgent",
    vehicle: { id: "XYZ789" },
  },
  {
    id: 3,
    description: "Battery replacement",
    maintenanceDate: "2024-07-15",
    cost: 120.0,
    maintenanceType: "Routine",
    vehicle: { id: "LMN456" },
  },
  {
    id: 4,
    description: "Transmission repair",
    maintenanceDate: "2024-06-30",
    cost: 600.0,
    maintenanceType: "Urgent",
    vehicle: { id: "DEF123" },
  },
  {
    id: 5,
    description: "Tire alignment",
    maintenanceDate: "2024-05-20",
    cost: 80.0,
    maintenanceType: "Routine",
    vehicle: { id: "GHI789" },
  },
];

const StyledContainer = styled(Container)({
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
});

const StyledBox = styled(Box)({
  width: "400px",
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "8px",
  position: "relative",
});

const VehicleMaintenance = ({ records = dummyRecords }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRecord(null);
  };

  // Filter records based on selected type and date
  const filteredRecords = records.filter((record) => {
    const matchesType = filterType
      ? record.maintenanceType === filterType
      : true;
    const matchesDate = filterDate
      ? new Date(record.maintenanceDate).toISOString().slice(0, 10) ===
        filterDate
      : true;
    return matchesType && matchesDate;
  });

  return (
    <StyledContainer>
      <Typography variant="h5" gutterBottom>
        Maintenance Records
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="filter-type-label">Maintenance Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Maintenance Type"
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Routine">Routine</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="date"
          label="Maintenance Date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Maintenance Date</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Maintenance Type</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>
                  {new Date(record.maintenanceDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{record.cost.toFixed(2)}</TableCell>
                <TableCell>{record.maintenanceType}</TableCell>
                <TableCell>{record.vehicle.id}</TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleViewDetails(record)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download Report">
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MaintenanceDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        record={selectedRecord}
      />
    </StyledContainer>
  );
};

const MaintenanceDetailsModal = ({ open, onClose, record }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="maintenance-details-title"
      aria-describedby="maintenance-details-description"
    >
      <StyledBox>
        <Typography variant="h6" component="h2" id="maintenance-details-title">
          Maintenance Details
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="body1" id="maintenance-details-description">
          <strong>Description:</strong> {record?.description}
          <br />
          <strong>Maintenance Date:</strong>{" "}
          {new Date(record?.maintenanceDate).toLocaleDateString()}
          <br />
          <strong>Cost:</strong> {record?.cost.toFixed(2)}
          <br />
          <strong>Maintenance Type:</strong> {record?.maintenanceType}
          <br />
          <strong>Vehicle:</strong> {record?.vehicle.id}
          <br />
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            /* Add functionality for download/print */
          }}
        >
          Download Report
        </Button>
      </StyledBox>
    </Modal>
  );
};

export default VehicleMaintenance;
