'use client'

import {useContext} from "react";
import {MoviesContext} from "@/components/MoviesContextProvider";
import {useQuery} from "@tanstack/react-query";
import {MovieOptions} from "@/model/movie";
import {PageSizeSelector} from "@/components/PageSizeSelector";
import {PagesNavigationButtons} from "@/components/PagesNavigationButtons";
import {Genre} from ".prisma/client";

const getGenres = async (): Promise<Genre[]> => {
    const response = await fetch('/api/genre')
    const genres = await response.json()
    return genres as Genre[]
}

function getMovieCount(options: MovieOptions) {
    return async (): Promise<number> => {
        let countOptions = ''
        if (options.titlePrefix != '')
            countOptions += `&filterNamePrefix=${options.titlePrefix}`
        if (options.genreId != undefined)
            countOptions += `&filterGenreId=${options.genreId}`
        if (options.minRating != 0)
            countOptions += `&filterRating=${options.minRating}`
        const response = await fetch('/api/movie?count' + countOptions)
        const movieCount = await response.json()
        return movieCount as number;
    };
}

export const MoviesSearchBar = () => {
    const [options, setOptions] = useContext(MoviesContext)
    const resultGenres = useQuery<Genre[]>([], getGenres)
    const resultCount = useQuery<number>([options], getMovieCount(options))
    if (resultGenres.isLoading || !resultGenres.data)
        return (
            <div className="flex gap-x-5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-5 my-5 h-10 animate-pulse"/>
        )
    const [genres, movieCount] = [resultGenres.data as Genre[], resultCount.data as number]
    return (
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-5 my-5">
            <input
                className="grow bg-gray-200 dark:bg-stone-700 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-black h-12"
                value={options.titlePrefix} placeholder="Search" onChange={event => {
                setOptions(Object.assign({}, options, {titlePrefix: event.target.value}))
            }}/>
            <div className="flex flex-col gap-y-1 items-center h-12">
                <div>
                    {options.minRating == 0 ? "Try the slider" : `Rating at least ${options.minRating}`}
                </div>
                <input className={getRatingColor(options.minRating)} type="range" min="0" max="100" step="1"
                       value={options.minRating}
                       onChange={event => setOptions(Object.assign({}, options, {minRating: +event.target.value}))}/>
            </div>
            <div className="rounded-xl bg-gray-200 dark:bg-stone-700 flex items-center gap-x-2 px-4 h-12">
                <label htmlFor="selectGenre">Select genre:</label>
                <select id="selectGenre" className="bg-gray-200 dark:bg-stone-700" value={options.genreId}
                        onChange={event => {
                            setOptions(Object.assign({}, options, {genreId: event.target.value != '--All--' ? +event.target.value : undefined}))
                        }}>
                    <option value={undefined}>--All--</option>
                    {genres.map(genre => (<option value={genre.id} key={genre.id}>{genre.name}</option>))}
                </select>
            </div>
            <div className="hidden md:block"/>
            <PagesNavigationButtons page={options.pageNumber} pageSize={options.pageSize} itemCount={movieCount}
                                    prevFunc={() => setOptions(Object.assign({}, options, {pageNumber: options.pageNumber - 1}))}
                                    nextFunc={() => setOptions(Object.assign({}, options, {pageNumber: options.pageNumber + 1}))}/>
            <PageSizeSelector text="Movies per page:" value={options.pageSize}
                              onChange={event => setOptions(Object.assign({}, options, {
                                  pageSize: +event.target.value,
                                  pageNumber: 1
                              }))}/>
        </div>
    )
}

function getRatingColor(rating: number): string {
    if (rating == 0)
        return "accent-gray-500"
    else if (rating < 20)
        return "accent-red-800"
    else if (rating < 35)
        return "accent-red-600"
    else if (rating < 50)
        return "accent-orange-400"
    else if (rating < 70)
        return "accent-orange-300"
    else if (rating < 90)
        return "accent-lime-500"
    return "accent-lime-400"
}