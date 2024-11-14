// CarCard.js
import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const CarCard = ({ car }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={car.image}
        alt={car.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {car.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {car.rating} | {car.trips} Trips
        </Typography>
        <Typography variant="body2">
          ₹{car.price}/hr (₹{car.totalPrice} excluding fees)
        </Typography>
        <Typography variant="body2">
          {car.transmission} • {car.fuelType} • {car.seats} Seats
        </Typography>
        <Typography variant="body2">
          Distance: {car.distance} km away
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CarCard;