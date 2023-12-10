"use client";

import React, { useState, useEffect } from 'react';
import MovieReview from '@/components/MovieReview';
import MovieDetails from '@/components/MovieDetails';
import AddReviewDialog from '@/components/AddReviewDialog';
import { Genre } from '@/model/genre';
import { useSession } from 'next-auth/react';
import MoviePageLoader from "@/app/MoviePageLoader";
import { updateBadges } from "@/app/movies/[id]/badgeService";

interface Review {
  id: number;
  userId: string;
  content: string;
  rating: number;
  movieId: number;
  likes: number;
  dislikes: number;
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

const MoviePage: React.FC<MoviePageParams> = ({ params }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let loggedUserId = session?.user?.id || '';
  const userHasReviewed = reviews.some(
      (review) => review.userId == loggedUserId && review.movieId == params.id
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie from the API
        const movieResponse = await fetch(`/api/movie?movieId=${params.id}`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        if (movieData.isNull) {
          setError('Movie with the given id does not exist');
          setLoading(false);
          return;
        }

        // Fetch reviews from the API
        const reviewsResponse = await fetch(`/api/review?movieId=${params.id}&page=1&pageSize=10`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        setLoading(false);
      } catch (error) {
        setError('Movie with the given id does not exist');
        setLoading(false);
        return;
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    // Update the movie's rating based on the new average
    const newAverageRating = calculateAverageRating(reviews);
    updateMovieRating(params.id, newAverageRating);
  }, [reviews, params.id]);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setContent('');
    setRating(0);
  };

  const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const updateMovieRating = async (movieId: number, newRating: number) => {
    try {
      const response = await fetch(`/api/movie?movieId=${movieId}&rating=${newRating}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error updating movie rating:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating movie rating:', error);
    }
  };

  const addReview = async () => {
    try {
      const response = await fetch(`/api/review?userId=${loggedUserId}&movieId=${params.id}&rating=${rating}&content=${content}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the request was successful
      if (response.ok) {
        const newReview = await response.json();
        setReviews((prevReviews) => [...prevReviews, newReview]);
        closeDialog();

        await updateBadges(loggedUserId);
      } else {
        console.error('Error adding review:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const removeReview = async (reviewId: number) => {
    // Update the reviews state by removing the review with the specified id
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
  };

  if (loading) {
    // Data is still loading, display loader
    return <MoviePageLoader />;
  }

  if (error) {
    return (
        <div className='flex justify-center items-center min-h-screen text-red-500 text-4xl'>
          Error: {error}
        </div>
    );
  } else {
    return (
        <div className='mx-auto my-8 ml-8 mr-8 p-8 dark:bg-neutral-800 shadow-md rounded-md overflow-y-auto'>
          {movie && (
              <div>
                <MovieDetails movie={movie} />
              </div>
          )}

          <div className='mt-8'>
            <h2 className='text-2xl font-bold mb-4'>Movie Reviews</h2>

            <div className="mt-4 relative">
              <button
                  className={`dark:bg-stone-500 text-white py-2 text-xl px-4 rounded ${
                      userHasReviewed || loggedUserId === 'unknown'
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                  }`}
                  onClick={
                    userHasReviewed || loggedUserId === 'unknown'
                        ? undefined
                        : openDialog
                  }
                  disabled={userHasReviewed || loggedUserId === ''}
                  title={
                    userHasReviewed
                        ? 'You already reviewed this movie'
                        : loggedUserId === 'unknown'
                            ? 'Please log in to add reviews'
                            : ''
                  }
              >
                Add Review
              </button>
            </div>

            <AddReviewDialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                onAddReview={addReview}
                content={content}
                rating={rating}
                onContentChange={(newContent) => setContent(newContent)}
                onRatingChange={(newRating) => setRating(newRating)}
            />

            {reviews.map((review) => (
                <MovieReview
                    key={review.id}
                    review={review}
                    userId={loggedUserId}
                    onRemoveReview={removeReview}
                />
            ))}
          </div>
        </div>
    );
  }
};

export default MoviePage;