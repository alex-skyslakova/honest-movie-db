import React from 'react';
import Image from 'next/image';
import {Movie} from ".prisma/client";
import Link from 'next/link';

const MovieOfThePeriod = (movie: Movie) => {
    return <Link href={`/movies`} className="flex flex-col items-center p-4">
        <div className="image-container relative w-full  mb-2" style={{paddingBottom: '100%'}}>
            {<Image src={movie.image ?? ''} alt={movie.title} layout="fill" objectFit="cover"
                                   className="rounded-lg absolute top-0 left-0"/>}
        </div>
        <h2 className="text-md font-semibold mb-1">{movie.title}</h2>
        <p className="text-sm text-gray-400">{movie.description}</p>
    </Link>
};

export default MovieOfThePeriod;
