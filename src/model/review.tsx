import {Movie} from ".prisma/client";
import {User} from "@prisma/client";

export type Review = {
    id: number;
    content: string;
    rating: number;
    user: User | null;
    userId: string;
    movie: Movie | null;
    movieId: number;
}