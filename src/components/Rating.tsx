// src/components/Rating.tsx
import React from 'react';

interface RatingProps {
  value: number;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
  // Calculate the color based on the percentage
  const getColor = () => {
    const red = Math.min(255, Math.round(255 * (100 - value) / 100));
    const green = Math.min(255, Math.round(255 * value / 100));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <span style={{ color: getColor() }}>
      {Math.round(value)}/100 {/* Display the rounded whole number */}
    </span>
  );
};

export default Rating;