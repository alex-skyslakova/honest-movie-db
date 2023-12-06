"use client";

// src/app/movies/[id]/page.tsx
import MovieReview from '@/components/MovieReview';
import Rating from '@/components/Rating';
import { useState, useEffect } from 'react';

// Placeholder data
const dummyMovie: Movie = {
  id: 1,
  title: 'Dummy Movie',
  description: 'This is a dummy movie for testing purposes. This is a dummy movie for testing purposes. This is a dummy movie for testing purposes. This is a dummy movie for testing purposes.This is a dummy movie for testing purposes.',
  image: 'band-of-brothers.png',
  rating: 85,
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
    rating: 20,
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
  const [content, setContent] = useState(''); // Track content in state
  const [rating, setRating] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching movie data
        setMovie(dummyMovie);

        // Simulate fetching review data
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

  const addReview = () => {
    // Handle form submission logic (e.g., send data to API)
    const newReview: Review = {
      id: reviews.length + 1,
      userId: 1, // You may need to get the actual user ID
      content: content, // Use the value from the content state
      rating: rating, // Use the value from the rating state
      movieId: params.id,
      likes: 0,
      dislikes: 0,
    };
    setReviews([...reviews, newReview]);
    closeDialog();

    // Log content and rating to console
    console.log('Content:', content);
    console.log('Rating:', rating);
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-800 shadow-md rounded-md overflow-y-auto">
      {movie && (
        <div className="flex flex-col lg:flex-row">
          {/* Movie Image on the Left */}
          <div className="flex-shrink-0 pr-8">
            <img
              className="w-64 h-64 object-cover rounded-md border-2 border-gray-300 shadow-md"
              src={`/img/movies/${movie.image || 'default-image.jpg'}`}
              alt={movie.title}
            />
          </div>

          {/* Movie Details on the Right */}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            {/* Description Box */}
            <div className="bg-gray-400 p-4 rounded-md mb-8 w-full">
              <p className="text-lg text-white">{movie.description}</p>
            </div>

            {/* Rating */}
            <div className="flex-shrink-0">
              <p className="text-3xl mb-8">
                Rating: <Rating value={movie.rating} />
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
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={openDialog}
          >
            Add Review
          </button>
        </div>

       {/* Add Review Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 w-96 rounded-md text-black">
            <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
            {/* Review Form */}
            <form>
              {/* Content */}
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  className="mt-1 p-2 w-full border rounded-md"
                  value={content}
                  onChange={(e) => setContent(e.target.value)} // Update content state
                />
              </div>

              {/* Rating Slider */}
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <input
                  type="range"
                  id="rating"
                  name="rating"
                  min="0"
                  max="100"
                  className="mt-1 w-full"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))} // Update rating state
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={closeDialog}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="ml-2 bg-green-500 text-white py-2 px-4 rounded"
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