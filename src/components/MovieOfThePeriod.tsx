import React from 'react';
import Link from 'next/link';
import {Movie} from "@/model/movie";

const MovieOfThePeriod = (movie: Movie) => {
    return <Link href={`/movie/${movie.id}`} className="flex flex-col items-center p-4">
        <div className="image-container relative w-full  mb-2" style={{paddingBottom: '100%'}}>
            <img src={movie.image ?? ''} alt={movie.title} className="rounded-lg absolute top-0 left-0"/>
        </div>
        <h2 className="text-md font-semibold mb-1">{movie.title}</h2>
        <p className="text-sm text-gray-400">{movie.description}</p>
    </Link>
};

export default MovieOfThePeriod;
