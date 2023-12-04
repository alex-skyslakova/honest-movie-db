'use client'

import {createContext, PropsWithChildren, useState} from "react";
import {MovieOptions} from "@/model/movie";

export const MoviesContext = createContext<[MovieOptions, (opts: MovieOptions) => void]>(undefined as never)

export const MoviesContextProvider = ({children}: PropsWithChildren) => {
    const state = useState<MovieOptions>({titlePrefix: '', minRating: 0, genreId: undefined, pageNumber: 0, pageSize: 10})
    return (
        <MoviesContext.Provider value={state}>
            {children}
        </MoviesContext.Provider>
    )
}