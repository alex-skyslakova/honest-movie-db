'use client'

import {createContext, PropsWithChildren, useState} from "react";
import {MovieOptions} from "@/model/movie";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            staleTime: 3600000
        }
    }
});

export const MoviesContext = createContext<[MovieOptions, (opts: MovieOptions) => void]>(undefined as never)

export const MoviesContextProvider = ({children}: PropsWithChildren) => {
    const state = useState<MovieOptions>({titlePrefix: '', minRating: 0, genreId: undefined, pageNumber: 1, pageSize: 10})
    return (
        <MoviesContext.Provider value={state}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </MoviesContext.Provider>
    )
}