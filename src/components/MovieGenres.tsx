import React from 'react';

interface MovieGenresProps {
    genres: { id: number; name: string }[];
}

const MovieGenres: React.FC<MovieGenresProps> = ({ genres }) => {
    return (
        <div className="flex mt-4">
            {genres.map((genre) => (
                <div key={genre.id} className="bg-gray-200 rounded-md p-2 mr-2">
                    {genre.name}
                </div>
            ))}
        </div>
    );
};

export default MovieGenres;
