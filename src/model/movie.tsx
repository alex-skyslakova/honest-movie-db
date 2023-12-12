//This model represents a single movie
//Movies can have multiple genres
//The image of the movie should have a specific ratio
//rating is computed every time a new review is created/deleted and represents an average of all ratings

import {Genre} from "@/model/genre";
import {Review} from "@/model/review";

export type Movie = {
    id: number;
	title: string;
	description: string;
    image: string;
    rating: number;
    reviews: Review[];
    genres: Genre[];
}

export interface MovieOptions {
    titlePrefix: string;
    minRating: number;
    genreId?: number;
    pageNumber: number;
    pageSize: number;
}