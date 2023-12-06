'use client'

import {useContext} from "react";
import {MoviesContext} from "@/components/MoviesContextProvider";

export const MoviesSearchBar = () => {
    const [options, setOptions] = useContext(MoviesContext)
    return (
        <div className="flex gap-x-5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-5 my-5">
            <input className="grow bg-gray-200 dark:bg-stone-700 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-black" value={options.titlePrefix} placeholder="Search" onChange={event => {
                setOptions(Object.assign({}, options, {titlePrefix: event.target.value}))
            }}/>
            <div className="flex flex-col gap-y-1 items-center">
                <div>
                    {options.minRating == 0 ? "Try the slider" : `Rating at least ${options.minRating}`}
                </div>
                <input className={getRatingColor(options.minRating)} type="range" min="0" max="100" step="1" value={options.minRating} onChange={event => setOptions(Object.assign({}, options, {minRating: event.target.value}))}/>
            </div>
            {/*TODO get genres and use them in the select*/}
            <div className="rounded-xl bg-gray-200 dark:bg-stone-700 flex items-center gap-x-2 px-4">
                <label htmlFor="selectGenre">Select genre:</label>
                <select id="selectGenre" className="bg-gray-200 dark:bg-stone-700" value={options.genreId}>
                    <option value={undefined}>--All--</option>
                    <option>Genre 1</option>
                    <option>Genre 2</option>
                </select>
            </div>
            <div className="hidden md:block"/>
            <div className="flex gap-x-2">
                <button disabled={options.pageNumber == 0} onClick={() => setOptions(Object.assign({}, options, {pageNumber: options.pageNumber-1}))} className={`${options.pageNumber == 0 ? "text-gray-500 bg-gray-300 dark:bg-stone-900" : "bg-gray-200 dark:bg-stone-700"} rounded-full px-5 text-xl`}>&#10094;</button>
                <button onClick={() => setOptions(Object.assign({}, options, {pageNumber: options.pageNumber+1}))} className="bg-gray-200 dark:bg-stone-700 rounded-full px-5 text-xl">&#10095;</button>
            </div>
            <div className="rounded-xl bg-gray-200 dark:bg-stone-700 flex items-center gap-x-2 px-4">
                <label htmlFor="selectPageSize">Movies per page:</label>
                <select id="selectPageSize" className="bg-gray-200 dark:bg-stone-700" value={options.pageSize} onChange={event => {
                    setOptions(Object.assign({}, options, {pageSize: event.target.value, pageNumber: 0}))
                }}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
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