// src/components/MovieReview.tsx
import React, { useState, useEffect } from 'react';
import RatingMovie from './RatingMovie';

interface MovieReviewProps {
  review: {
    id: number;
    userId: number;
    content: string;
    rating: number;
    movieId: number;
  };
  userId: string; // Add userId as a prop
}

const MovieReview: React.FC<MovieReviewProps> = ({ review, userId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<boolean | null>(null); // Indicates if the user has voted

  useEffect(() => {
    // Fetch likes, dislikes, and user vote for the review
    const fetchVotes = async () => {
      try {
        const response = await fetch(`/api/vote?reviewId=${review.id}`);
        const votes = await response.json();

        if (!votes) {
          // Handle the case where votes are null (or any other error handling logic)
          console.error('Votes are null or empty.');
          return;
        }

        const likesCount = votes.filter((vote: { isLike: boolean }) => vote.isLike).length;
        const dislikesCount = votes.filter((vote: { isLike: boolean }) => !vote.isLike).length;

        setLikes(likesCount);
        setDislikes(dislikesCount);

        // Check if the user has voted for this review
        const userVote = votes.find((vote: { userId: string }) => vote.userId === userId);
        setUserVote(userVote ? userVote.isLike : null);
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    };

    fetchVotes();
  }, [review.id, userId]);

  const handleLike = async () => {
    if (userVote !== true) {
      try {
        // Send a request to post a new vote with isLike=true
        await fetch(`/api/vote?userId=${userId}&reviewId=${review.id}&isLike=true`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Update the likes count and user vote
        setLikes(likes + 1);
        setUserVote(true);
      } catch (error) {
        console.error('Error liking the review:', error);
      }
    }
  };

  const handleDislike = async () => {
    if (userVote !== false) {
      try {
        // Send a request to post a new vote with isLike=false
        await fetch(`/api/vote?userId=${userId}&reviewId=${review.id}&isLike=false`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Update the dislikes count and user vote
        setDislikes(dislikes + 1);
        setUserVote(false);
      } catch (error) {
        console.error('Error disliking the review:', error);
      }
    }
  };

  return (
      <div className="border p-4 my-4 dark:bg-stone-700 rounded-md shadow-md flex items-start relative">
        <div className="flex-grow">
          <p className="font-bold">User: {review.userId}</p>
          <p className=" mb-7 mt-2">Content: {review.content}</p>
        </div>

        {/* Rating (moved to the bottom left) */}
        <p className="absolute bottom-2 left-2 text-xl font-bold ml-2">
          Rating: <RatingMovie value={review.rating} />
        </p>

        {/* Like and Dislike Icons */}
        <div className="flex flex-col items-end ml-4 w-1/5">
          <div className="flex mt-4">
            <button
                className={`mr-2 p-2 border rounded-md ${likes ? 'bg-green-500' : 'bg-gray-600'}`}
                onClick={handleLike}
            >
              <img
                  src="/img/icons/like.png"
                  alt="Like"
                  className="w-6 h-6"
              />
            </button>
            <button
                className={`p-2 border rounded-md ${dislikes ? 'bg-red-500' : 'bg-gray-600'}`}
                onClick={handleDislike}
            >
              <img
                  src="/img/icons/dislike.png"
                  alt="Dislike"
                  className="w-6 h-6"
              />
            </button>
          </div>

          {/* Likes and Dislikes Counts */}
          <div className="mt-2 flex flex-col">
            <span className="mr-4">Likes: {likes}</span>
            <span>Dislikes: {dislikes}</span>
          </div>
        </div>
      </div>
  );
};

export default MovieReview;
