
import {Movie} from "@/model/movie";
import {User} from "@/model/user";

export type Review = {
    id: number;
    content: string;
    rating: number;
    user: User | null;
    userId: string;
    movie: Movie | null;
    movieId: number;
}