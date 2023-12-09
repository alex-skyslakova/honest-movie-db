'use client'

import {Movie, MovieOptions} from "@/model/movie";
import {Suspense, useContext, useEffect, useState} from "react";
import {MoviesContext, MoviesContextProvider} from "@/components/MoviesContextProvider";
import {MoviesSearchBar} from "@/components/MoviesSearchBar";
import {MoviesList} from "@/components/MoviesList";

export const MoviesListWrapper = ({fn}:{fn: (opts: MovieOptions) => Promise<Movie[]>}) => {
    const [getFunction, setGetFunction] = useState<{_: (opts: MovieOptions) => Promise<Movie[]>}>({_: async () => []})
    useEffect(() => {
        setGetFunction({_: fn})
    }, [])
    return (
        <MoviesContextProvider>
            <MoviesSearchBar/>
            <Suspense fallback={
                <div className="animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800 w-full h-screen"/>
            }>
                <MoviesResult fn={getFunction._}/>
            </Suspense>
        </MoviesContextProvider>
    )
}

const MoviesResult = async ({fn}:{fn: (opts: MovieOptions) => Promise<Movie[]>}) => {
    const [options, _] = useContext(MoviesContext)
    const movies = await fn(options)
    return (<MoviesList movies={movies}/>)
}