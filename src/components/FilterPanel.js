import React from 'react';
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from '@/components/ui/card';

const FilterPanel = ({ filters, distance, priceRange, onFilterChange, onDistanceChange, onPriceRangeChange }) => {
  const handleFilterChange = (category, value) => {
    onFilterChange(category, value);
  };

  return (
    <Box>
      <Box className="mb-4">
        <Typography variant="h6">Find Your Perfect Ride!</Typography>
      </Box>
      
      <Box className="mb-4">
        <Typography className="mb-2">Distance</Typography>
        <Slider
          value={distance}
          onChange={onDistanceChange}
          className="w-full"
          min={0}
          max={100}
        />
      </Box>

      <Box className="mb-4">
        <FormControlLabel
          control={<Checkbox />}
          label="Home Delivery"
        />
        <Typography className="text-sm text-gray-500">Additional Delivery charge applicable</Typography>
      </Box>

      <Box className="mb-4">
        <Typography className="mb-2">Total Price</Typography>
        <Slider
          value={priceRange}
          onChange={onPriceRangeChange}
          className="w-full"
          min={200}
          max={3800}
        />
      </Box>

      <Box className="mb-4">
        <Typography className="mb-2">Car Details</Typography>
        <FormControl>
          <FormLabel>Filter By Car Type</FormLabel>
          {['SUV', 'Sedan', 'Hatchback', 'Luxury'].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox 
                  checked={filters.carType.includes(type)} 
                  onChange={() => handleFilterChange('carType', type)} 
                />
              }
              label={type}
            />
          ))}
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl>
          <FormLabel>Filter By Transmission</FormLabel>
          {['Manual', 'Automatic'].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox 
                  checked={filters.transmission.includes(type)} 
                  onChange={() => handleFilterChange('transmission', type)} 
                />
              }
              label={type}
            />
          ))}
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl>
          <FormLabel>Filter By Fuel Type</FormLabel>
          {['Diesel', 'Petrol', 'Electric'].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox 
                  checked={filters.fuelType.includes(type)} 
                  onChange={() => handleFilterChange('fuelType', type)} 
                />
              }
              label={type}
            />
          ))}
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl>
          <FormLabel>Seats</FormLabel>
          {['4/5 Seater', '6/7 Seater'].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox 
                  checked={filters.seats.includes(type)} 
                  onChange={() => handleFilterChange('seats', type)} 
                />
              }
              label={type}
            />
          ))}
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl>
          <FormLabel>User Ratings</FormLabel>
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
    </Box>
  );
};

export default FilterPanel