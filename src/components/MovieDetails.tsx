// components/MovieDetails.tsx
import React from 'react';
import RatingMovie from "@/components/RatingMovie";
import {Genre} from "@/model/genre";

interface MovieDetailsProps {
    movie: {
        id: number;
        title: string;
        description: string;
        image: string | null;
        rating: number;
        genres: Genre[]
    };
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie } ) => {
    return (
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

                {/* Genres */}
                <div className="flex mt-4">
                    {movie.genres.map((genre) => (
                        <div key={genre.id} className="dark:bg-stone-600 rounded-md p-2 mr-2 mb-6">
                            {genre.name}
                        </div>
                    ))}
                </div>
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
    );
};

export default MovieDetails;
