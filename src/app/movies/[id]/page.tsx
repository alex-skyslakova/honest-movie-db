"use client";

// src/app/movies/[id]/page.tsx
import MovieReview from '@/components/MovieReview';
import MovieDetails from '@/components/MovieDetails';
import React, { useState, useEffect } from 'react';
import AddReviewDialog from "@/components/AddReviewDialog";
import {Genre} from "@/model/genre";
import { Vote } from '@prisma/client';
import { useSession } from 'next-auth/react';
import ReactTooltip from 'react-tooltip';

interface Review {
  id: number;
  userId: string;
  content: string;
  rating: number;
  movieId: number;
  likes: number;
  dislikes: number;
  votes: Vote[];
}

interface Movie {
  id: number;
  title: string;
  description: string;
  image: string | null;
  rating: number;
  genres: Genre[];
}

type MoviePageParams = {
  params: { id: number };
};


const MoviePage = ({ params }: MoviePageParams) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const { data: session } = useSession();

  let loggedUserId = "unknown";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details from the API
        const movieResponse = await fetch(`/api/movie?movieId=${params.id}`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch reviews from the API
        const reviewsResponse = await fetch(`/api/review?movieId=${params.id}&page=1&pageSize=10`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    // Clear form fields when closing the dialog
    setContent('');
    setRating(0);
  };

  const addReview = async () => {
    console.log(movie);
    console.log(movie?.genres);
    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/review?userId=clpy5pfb400003nj1j3un3652&movieId=${params.id}&rating=${rating}&content=${content}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response JSON
        const newReview = await response.json();
  
        // Handle the response as needed
        console.log('Review added successfully:', newReview);
  
        // Update the reviews state with the new review
        setReviews([...reviews, newReview]);
        closeDialog();
  
        // Log content and rating to console
        console.log('Content:', content);
        console.log('Rating:', rating);
      } else {
        // Handle the error case
        console.error('Error adding review:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
      <div className="mx-auto my-8 p-8 dark:bg-neutral-800 shadow-md rounded-md overflow-y-auto">
        {movie && (
            <div>
              <MovieDetails movie={movie}/>
            </div>
        )}

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Movie Reviews</h2>

          {/* Add Review Button */}
          <div className="mt-4 relative">
            <button
                className={`dark:bg-stone-500 text-white py-2 text-xl px-4 rounded ${loggedUserId === "unknown" ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={openDialog}
                disabled={loggedUserId === "unknown"}
                title={loggedUserId === "unknown" ? "Please log in to add reviews" : ""}
            >
              Add Review
            </button>
          </div>

          {/* Add Review Dialog */}
          <AddReviewDialog
              isOpen={isDialogOpen}
              onClose={() => setDialogOpen(false)}
              onAddReview={addReview}
              content={content}
              rating={rating}
              onContentChange={(newContent) => setContent(newContent)}
              onRatingChange={(newRating) => setRating(newRating)}
        />

        {/* Display Reviews */}
        {movie && (reviews.map((review) => (
            <MovieReview key={review.id} review={review} userId={loggedUserId} />
        )))}
      </div>
    </div>
  );
};

export default MoviePage;