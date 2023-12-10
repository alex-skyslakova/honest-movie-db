import React from 'react';

const MoviePageLoader: React.FC = () => {
    return (
        <div className="flex items-start justify-center min-h-screen">
            <div className="mx-auto my-8 mx-8 p-8 dark:bg-neutral-800 shadow-md rounded-md overflow-y-auto align-middle">
                {/* Loader message or animation */}
                <p>Loading movie and reviews...</p>
            </div>
        </div>
    );
};

export default MoviePageLoader;
