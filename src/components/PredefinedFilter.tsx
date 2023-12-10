'use client';
import {useContext, useEffect, useState} from "react";
import {MoviesContext} from "@/components/MoviesContextProvider";
import Link from "next/link";

type PredefinedFilterProps = {
    genreId: number
}

export const PredefinedFilter = (props: PredefinedFilterProps) => {

    const [movieOptions, setMovieOptions] = useContext(MoviesContext)
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        console.log('clicked')
        console.log(props.genreId)
        setMovieOptions({...movieOptions, genreId: props.genreId, pageNumber: 1});
        setClicked(false);

    }, [clicked]);


    return (<Link
        href="/movies"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
        onClick={() => setClicked(true)}
    >
        <h2 className={`mb-3 text-2xl font-semibold`}>
            Romance{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
        </p>
    </Link>)
}