import {MoviesListWrapper} from "@/components/MoviesListWrapper";
import fs from "fs";
import {Movie, MovieOptions} from "@/model/movie";

export default async function Movies() {
    return (
        <div className="m-5">
            <MoviesListWrapper fn={getMovies} />
        </div>
    )
}

async function getMovies(opts: MovieOptions): Promise<Movie[]> {
    'use server'
    const file = await new Promise<string>(resolve => fs.readFile('data.json', (err, data) => resolve(data?.toString() || '')))
    const json = JSON.parse(file)
    return (json?.movies ?? []) as Movie[]
}