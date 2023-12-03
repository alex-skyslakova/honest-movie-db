// components/MovieReview.tsx
import React from 'react';
import { Review } from '../model/review';

type MovieReviewProps = {
  review: Review;
};

const MovieReview: React.FC<MovieReviewProps> = ({ review }) => {
  return (
    <div>
      <p>User: {review.user.name}</p>
      <p>Content: {review.content}</p>
      <p>Rating: {review.rating}</p>
      <p>Likes: {review.likes}</p>
      <p>Dislikes: {review.dislikes}</p>
    </div>
  );
};

export default MovieReview;
