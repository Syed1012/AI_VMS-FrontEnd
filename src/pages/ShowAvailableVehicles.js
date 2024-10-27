import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, Slider, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';

const carData = [
  {
    id: 1,
    name: 'Maruti Suzuki Swift 2022',
    image: 'https://imgd.aeplcdn.com/1056x594/n/itk98db_1738093.jpg?q=80',
    rating: 4.15,
    trips: 199,
    price: 90,
    totalPrice: 360,
    transmission: 'Manual',
    fuelType: 'Petrol',
    seats: 5,
    distance: 3.4,
    features: ['ACTIVE FASTAG'],
  },
  // Add more car objects here...
];

const ShowAvailableVehicles = () => {
  const [sortBy, setSortBy] = useState('Relevance');
  const [distance, setDistance] = useState(50);
  const [priceRange, setPriceRange] = useState([200, 3800]);
  const [filters, setFilters] = useState({
    carType: [],
    transmission: [],
    fuelType: [],
    seats: [],
    userRating: '',
  });

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: Array.isArray(prevFilters[category])
        ? prevFilters[category].includes(value)
          ? prevFilters[category].filter(item => item !== value)
          : [...prevFilters[category], value]
        : value
    }));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Find Your Perfect Ride!</Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Distance</Typography>
            <Slider
              value={distance}
              onChange={handleDistanceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Home Delivery"
            />
            <Typography variant="caption">Additional Delivery charge applicable</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Total Price</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={200}
              max={3800}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Car Details</Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Filter By Car Type</FormLabel>
              {['SUV', 'Sedan', 'Hatchback', 'Luxury'].map((type) => (
                <FormControlLabel
                  key={type}
                  control={<Checkbox checked={filters.carType.includes(type)} onChange={() => handleFilterChange('carType', type)} />}
                  label={type}
                />
              ))}
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Filter By Transmission</FormLabel>
              {['Manual', 'Automatic'].map((type) => (
                <FormControlLabel
                  key={type}
                  control={<Checkbox checked={filters.transmission.includes(type)} onChange={() => handleFilterChange('transmission', type)} />}
                  label={type}
                />
              ))}
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Filter By Fuel Type</FormLabel>
              {['Diesel', 'Petrol', 'Electric'].map((type) => (
                <FormControlLabel
                  key={type}
                  control={<Checkbox checked={filters.fuelType.includes(type)} onChange={() => handleFilterChange('fuelType', type)} />}
                  label={type}
                />
              ))}
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Seats</FormLabel>
              {['4/5 Seater', '6/7 Seater'].map((type) => (
                <FormControlLabel
                  key={type}
                  control={<Checkbox checked={filters.seats.includes(type)} onChange={() => handleFilterChange('seats', type)} />}
                  label={type}
                />
              ))}
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">User Ratings</FormLabel>
              <RadioGroup
                value={filters.userRating}
                onChange={(e) => handleFilterChange('userRating', e.target.value)}
              >
                {['4.5+ Rated', '4.2+ Rated', '4.0+ Rated', '3.5+ Rated', 'All'].map((rating) => (
                  <FormControlLabel key={rating} value={rating} control={<Radio />} label={rating} />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Showing {carData.length} cars at</Typography>
            <FormControl>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Sort by' }}
              >
                <MenuItem value="Relevance">Relevance</MenuItem>
                <MenuItem value="Price - Low to High">Price - Low to High</MenuItem>
                <MenuItem value="Price - High to Low">Price - High to Low</MenuItem>
                <MenuItem value="Ratings - High to Low">Ratings - High to Low</MenuItem>
                <MenuItem value="Distance - Nearest First">Distance - Nearest First</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2}>
            {carData.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
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
                      {car.distance} km away
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {car.features.map((feature, index) => (
                        <Button key={index} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }}>
                          {feature}
                        </Button>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShowAvailableVehicles;