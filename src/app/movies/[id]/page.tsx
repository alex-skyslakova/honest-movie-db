"use client";

// src/app/movies/[id]/page.tsx
import MovieReview from '@/components/MovieReview';
import RatingMovie from '@/components/RatingMovie';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Placeholder data
const dummyMovie: Movie = {
  id: 1,
  title: 'Dummy Movie',
  description: 'This is a dummy movie for testing purposes. This is a dummy movie for testing purposes. This is a dummy movie for testing purposes. This is a dummy movie for testing purposes.This is a dummy movie for testing purposes.',
  image: 'band-of-brothers.png',
  rating: 60,
};

const dummyReviews: Review[] = [
  {
    id: 101,
    userId: 1,
    content: 'Great movie! Loved it!',
    rating: 80,
    movieId: 1,
    likes: 10,
    dislikes: 10,
  },
  {
    id: 102,
    userId: 2,
    content: 'Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.Good storyline, but pacing could be improved.',
    rating: 50,
    movieId: 1,
    likes: 10,
    dislikes: 10,
  },
  {
    id: 103,
    userId: 3,
    content: 'Enjoyed every moment. Highly recommended!',
    rating: 16,
    movieId: 1,
    likes: 10,
    dislikes: 10,
  },
  {
    id: 104,
    userId: 4,
    content: 'Average movie, nothing special.',
    rating: 69,
    movieId: 1,
    likes: 10,
    dislikes: 10,
  },
  // Add more dummy reviews as needed
];

interface Review {
  id: number;
  userId: number;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details from the API
        const movieResponse = await fetch(`/api/movie?movieId=${params.id}`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch reviews from the API
        //const reviewsResponse = await fetch(`/api/db/review?movieId=${params.id}&page=1&pageSize=10`);
        //const reviewsData = await reviewsResponse.json();
        setReviews(dummyReviews);
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
    try {
      // Make a POST request to the API endpoint
      const response = await fetch('/api/db/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Replace with the actual user ID
          movieId: params.id,
          rating: rating,
          content: content,
        }),
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

  function calculateColor(): string {
    if (rating == 0)
        return "accent-gray-500"
    else if (rating < 20)
        return "accent-red-800"
    else if (rating < 35)
        return "accent-red-600"
    else if (rating < 50)
        return "accent-orange-400"
    else if (rating < 70)
        return "accent-orange-300"
    else if (rating < 90)
        return "accent-lime-500"
    return "accent-lime-400"
}

  return (
    <div className="mx-auto my-8 p-8 dark:bg-neutral-800 shadow-md rounded-md overflow-y-auto">
      {movie && (
        <div className="flex flex-col lg:flex-row">
          {/* Movie Image on the Left */}
          <div className="flex-shrink-0 pr-8">
            <img
              className="w-64 h-64 object-cover rounded-md border-2 border-gray-300 shadow-md"
              src={`${movie.image || 'default-image.jpg'}`}
              alt={movie.title}
            />
          </div>

          {/* Movie Details on the Right */}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            {/* Description Box */}
            <div className="dark:bg-stone-700 p-4 rounded-md mb-8 w-full">
              <p className="text-lg text-white">{movie.description}</p>
            </div>

            {/* Rating */}
            <div className="flex-shrink-0">
              <p className="text-3xl mb-8">
                Rating: <RatingMovie value={movie.rating} />
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Movie Reviews</h2>

        {/* Add Review Button */}
        <div className="mt-4">
          <button
            className="dark:bg-stone-500 text-white py-2 text-xl px-4 rounded"
            onClick={openDialog}
          >
            Add Review
          </button>
        </div>

       {/* Add Review Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="dark:bg-stone-400 p-4 w-96 rounded-md text-black">
            <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
            {/* Review Form */}
            <form>
              {/* Content */}
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium  text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  className="dark:bg-stone-300 mt-1 p-2 w-full border rounded-md"
                  value={content}
                  onChange={(e) => setContent(e.target.value)} // Update content state
                />
              </div>

              {/* Rating Slider */}
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rating: {rating} {/* Display the actual rating value */}
                </label>
                <input
                  type="range"
                  id="rating"
                  name="rating"
                  min="0"
                  max="100"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className={`mt-1 w-full h-6 ${calculateColor()} rounded-md`}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="dark:bg-stone-500 text-white py-2 px-4 rounded"
                  onClick={closeDialog}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="ml-2 dark:bg-stone-700 text-white py-2 px-4 rounded"
                  onClick={addReview}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        {/* Display Reviews */}
        {reviews.map((review) => (
          <MovieReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;