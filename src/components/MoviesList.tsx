import {Movie} from "@/model/movie";
import {MoviesListItem} from "@/components/MoviesListItem";

export const MoviesList = ({movies}:{movies: Movie[]}) => {
    return (
        <div className="flex flex-col gap-y-7 rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-5">
            {movies.map(movie => (
                <MoviesListItem key={movie.id} movie={movie}/>
            ))}
        </div>
    )
}