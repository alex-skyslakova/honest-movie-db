// src/components/Rating.tsx
import React from 'react';

interface RatingMovieProps {
  value: number;
}

const RatingMovie: React.FC<RatingMovieProps> = ({ value }) => {
  // Calculate the color based on the percentage
  const getColor = () => {
    // Interpolate between red (255, 0, 0) and yellow (255, 255, 0) for values from 0 to 50
    // Interpolate between yellow (255, 255, 0) and green (0, 255, 0) for values from 50 to 100
    const red = Math.min(255, Math.round(255 * Math.min(1, (100 - value) / 50)));
    const green = Math.min(255, Math.round(255 * Math.min(1, value / 50)));
    
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <span style={{ color: getColor() }}>
      {Math.round(value)}/100 {/* Display the rounded whole number */}
    </span>
  );
};

export default RatingMovie;
