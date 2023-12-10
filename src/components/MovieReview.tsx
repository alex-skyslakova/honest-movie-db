// src/components/MovieReview.tsx
import React, { useState, useEffect } from 'react';
import RatingMovie from './RatingMovie';
import { User } from '@prisma/client';
import Link from 'next/link';


interface MovieReviewProps {
  review: {
    id: number;
    userId: string;
    content: string;
    rating: number;
    movieId: number;
  };
  userId: string;
  onRemoveReview: (reviewId: number) => void;
}

const MovieReview: React.FC<MovieReviewProps> = ({ review, userId, onRemoveReview }) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetch(`/api/user?userId=${review.userId}`);
        const userData = await user.json();
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [review.id, userId]);

  const handleRemoveReview = async () => {
    console.log('Removing Review:', review.id);
    try {
      await fetch(`/api/review?reviewId=${review.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Notify the parent component to update the UI
      onRemoveReview(review.id);
    } catch (error) {
      console.error('Error removing review:', error);
    }
  };

  return (
      <div className="border p-4 my-4 dark:bg-stone-700 rounded-md shadow-md flex items-start relative">
        <div className="flex-grow">
          {/* Use Link to create a link to the user's profile */}
          <Link href={`/profile/${review.userId}`}>
            <p className="font-bold">{userDetails ? userDetails.name : ""}:</p>
          </Link>
          <p className="mb-7 mt-2">{review.content}</p>
        </div>

        <p className="absolute bottom-2 left-2 text-xl font-bold ml-2">
          Rating: <RatingMovie value={review.rating}/>
        </p>

        <div className="flex flex-col items-end ml-4 w-1/5">
          {/* Render Remove Review button only if the user is the author of the review */}
          {userId === review.userId && (
              <button
                  className="rounded-md"
                  onClick={handleRemoveReview}
                  title="Delete Review"
              >
                <img src="/img/icons/delete.png" alt="Delete" className="w-14 h-12" />
              </button>
          )}
        </div>
      </div>
  );
};

export default MovieReview;
