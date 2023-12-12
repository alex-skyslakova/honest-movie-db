import {MoviesListWrapper} from "@/components/MoviesListWrapper";
import {Movie, MovieOptions} from "@/model/movie";
import {getMovies as getMoviesFromDb} from "@/api/db/movie";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Movies',
}

export default async function Movies() {
    return (
        <div className="m-5">
            <MoviesListWrapper fn={getMovies} />
        </div>
    )
}

async function getMovies(opts: MovieOptions): Promise<Movie[]> {
    'use server'
    const movies = await getMoviesFromDb({genreId: opts.genreId, minRating: opts.minRating, namePrefix: opts.titlePrefix, page: opts.pageNumber, pageSize: opts.pageSize})
    return movies as Movie[]
}