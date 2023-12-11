//This model represents a single movie
//Movies can have multiple genres
//The image of the movie should have a specific ratio
//rating is computed every time a new review is created/deleted and represents an average of all ratings
import {Genre, Review} from ".prisma/client";

export type Movie = {
    id: number;
	title: string;
    genre: Genre[];
	description: string;
    image: string;
    rating: number;
    reviews: Review[];
}

export interface MovieOptions {
    titlePrefix: string;
    minRating: number;
    genreId?: number;
    pageNumber: number;
    pageSize: number;
}