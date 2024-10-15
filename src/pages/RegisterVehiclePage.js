import React from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Create a custom theme
const theme = createTheme({
    palette: {
      primary: {
        main: "#7AA2E3",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
    },
  });
  
  const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  
  const GlassBox = styled(Box)(({ theme }) => ({
    background: "white",
    borderRadius: "15px",
    padding: theme.spacing(4),
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: 400,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  }));
  
  const StyledButton = styled(Button)(({ theme }) => ({
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1.5),
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "white",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
    "&:last-child": {
      marginBottom: 0,
    },
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 4px 20px rgba(122, 162, 227, 0.4)",
    },
  }));

const RegisterVehiclePage = () => {
    const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer maxWidth={false} disableGutters>
        <GlassBox>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            style={{ color: "#333", marginBottom: "30px" }}
          >
            Choose an Option
          </Typography>
          <Box>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => handleNavigation("/registervehicle")}
            >
              Register Vehicle
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => handleNavigation("/updatevehicle-status")}
            >
              Update Vehicle Status
            </StyledButton>
            
          </Box>
        </GlassBox>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default RegisterVehiclePage