// src/components/MovieReview.tsx
import React, { useState } from 'react';
import Rating from './Rating';

interface MovieReviewProps {
  review: {
    id: number;
    userId: number;
    content: string;
    rating: number;
    movieId: number;
    likes: number;
    dislikes: number;
  };
}

const MovieReview: React.FC<MovieReviewProps> = ({ review }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked); // Toggle the liked state
    setDisliked(false); // Reset the disliked state
    // Add logic to send like to the API or update the review in your data
  };

  const handleDislike = () => {
    setDisliked(!disliked); // Toggle the disliked state
    setLiked(false); // Reset the liked state
    // Add logic to send dislike to the API or update the review in your data
  };

  return (
    <div className="border p-4 my-4 bg-gray-500 rounded-md shadow-md flex items-start relative">
      <div className="flex-grow">
        <p className="font-bold">User: {review.userId}</p>
        <p className=" mb-7 mt-2">Content: {review.content}</p>
      </div>

      {/* Rating (moved to the bottom left) */}
      <p className="absolute bottom-2 left-2 text-lg font-bold ml-2">
        Rating: <Rating value={review.rating} />
      </p>

      {/* Like and Dislike Icons */}
      <div className="flex flex-col items-end ml-4 w-1/5">
        <div className="flex mt-4">
          <button
            className={`mr-2 p-2 border rounded-md ${liked ? 'bg-green-500' : 'bg-gray-600'}`}
            onClick={handleLike}
          >
            <img
              src="/img/icons/like.png"
              alt="Like"
              className="w-4 h-4"
            />
          </button>
          <button
            className={`p-2 border rounded-md ${disliked ? 'bg-red-500' : 'bg-gray-600'}`}
            onClick={handleDislike}
          >
            <img
              src="/img/icons/dislike.png"
              alt="Dislike"
              className="w-4 h-4"
            />
          </button>
        </div>

        {/* Likes and Dislikes Counts */}
        <div className="mt-2 flex flex-col">
          <span className="mr-4">Likes: {review.likes}</span>
          <span>Dislikes: {review.dislikes}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieReview;
