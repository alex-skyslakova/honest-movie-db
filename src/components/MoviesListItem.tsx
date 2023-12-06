import {Movie} from "@/model/movie";
import {Rating} from "@/components/Rating";
import Image from "next/image";
import Link from "next/link";

export const MoviesListItem = ({movie}:{movie: Movie}) => {
    return (
        <Link href={`/movies/${movie.id}`} className="flex border-b gap-x-6 border-neutral-500 last:border-0">
            <Image src={movie.image} alt="Image" width={0} height={0} sizes="100vw" className="w-auto h-32"/>
            <div className="flex flex-col gap-y-2">
                <h4 className="text-xl">{movie.title}</h4>
                <p>{movie.description}</p>
            </div>
            <div className="flex flex-col text-center ml-auto">
                <Rating percentage={movie.rating}/>
                <div>{movie.reviews.length} reviews</div>
            </div>
        </Link>
    )
}