// src/components/MovieReview.tsx
import React, { useState, useEffect } from 'react';
import RatingMovie from './RatingMovie';
import {User, Vote} from '@prisma/client';


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
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<boolean | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [voted, setVoted] = useState(false);
  let userVoteInstance: Vote | null = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/vote?reviewId=${review.id}`);
        const votes = await response.json();

        let likesCount = 0;
        let dislikesCount = 0;

        if (votes) {
          likesCount = votes.filter((vote: { isLike: boolean }) => vote.isLike).length;
          dislikesCount = votes.filter((vote: { isLike: boolean }) => !vote.isLike).length;
          userVoteInstance = votes.find((vote: { userId: string }) => vote.userId === userId);
          setUserVote(userVoteInstance ? userVoteInstance.isLike : null);
        }

        setLikes(likesCount);
        setDislikes(dislikesCount);

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

  const handleVote = async (isLike: boolean) => {
    try {
      let newLikes = likes;
      let newDislikes = dislikes;

      console.log(voted);

      if (voted) {
        // If the user has already voted, update the existing vote
        await fetch(`/api/vote?userId=${userId}&reviewId=${review.id}&isLike=${isLike}&voteId=${userVoteInstance?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setUserVote(isLike);

        // Update counts based on the previous vote
        if (userVoteInstance?.isLike === true) {
          newLikes -= 1;
        } else if (userVoteInstance?.isLike === false) {
          newDislikes -= 1;
        }

        // Update counts based on the new vote
        if (isLike) {
          newLikes += 1;
        } else {
          newDislikes += 1;
        }
      } else {
        // If the user hasn't voted yet, create a new vote
        await fetch(`/api/vote?userId=${userId}&reviewId=${review.id}&isLike=${isLike}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Update the user vote and counts
        setUserVote(isLike);
        if (isLike) {
          newLikes += 1;
        } else {
          newDislikes += 1;
        }

        setVoted(true);
      }

      // Update the state with the new counts
      setLikes(newLikes);
      setDislikes(newDislikes);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
      <div className="border p-4 my-4 dark:bg-stone-700 rounded-md shadow-md flex items-start relative">
        <div className="flex-grow">
          <p className="font-bold">Reviewed by {userDetails ? userDetails.name : ""}:</p>
          <p className=" mb-7 mt-2">{review.content}</p>
        </div>

        <p className="absolute bottom-2 left-2 text-xl font-bold ml-2">
          Rating: <RatingMovie value={review.rating} />
        </p>

        <div className="flex flex-col items-end ml-4 w-1/5">
          <div className="flex mt-4">
            <button
                className={`mr-2 p-2 border rounded-md ${userVote === true ? 'bg-green-500' : 'bg-gray-600'}`}
                onClick={() => handleVote(true)}
            >
              <img
                  src="/img/icons/like.png"
                  alt="Like"
                  className="w-6 h-6"
              />
            </button>
            <button
                className={`p-2 border rounded-md ${userVote === false ? 'bg-red-500' : 'bg-gray-600'}`}
                onClick={() => handleVote(false)}
            >
              <img
                  src="/img/icons/dislike.png"
                  alt="Dislike"
                  className="w-6 h-6"
              />
            </button>
          </div>

          <div className="mt-2 flex flex-col">
            <span className="mr-4">Likes: {likes}</span>
            <span>Dislikes: {dislikes}</span>
          </div>

          {/* Render Remove Review button only if the user is the author of the review */}
          {userId === review.userId && (
              <button
                  className="mt-2 p-2 border rounded-md bg-red-800 text-white"
                  onClick={handleRemoveReview}
                  title="Delete Review"
              >
                <img src="/img/icons/delete.png" alt="Delete" className="w-6 h-6" />
              </button>
          )}
        </div>
      </div>
  );
};

export default MovieReview;
