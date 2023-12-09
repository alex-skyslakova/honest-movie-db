import React from 'react';

const MoviePageLoader: React.FC = () => {
    return (
        <div className="mx-auto my-8 p-8 dark:bg-neutral-800 shadow-md rounded-md overflow-y-auto">
            {/* Loader message or animation */}
            <p>Loading...</p>
        </div>
    );
};

export default MoviePageLoader;