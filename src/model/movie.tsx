import { Genre } from "./genre";
import { Review } from "./review";

//This model represents a single movie
//Movies can have multiple genres
//The image of the movie should have a specific ratio
//rating is computed every time a new review is created and represents an average of all ratings
//topReview is kept/changed every time a new review is added. This feature will be used in the
//top daily/weekly movie component  
export type Movie = {
    id: number;
	title: string;
    genre: Genre[];
	description: string;
    image: HTMLImageElement;
    rating: number;
    topReview: Review[];
    reviews: Review[];
}