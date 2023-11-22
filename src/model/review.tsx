import { User } from "./user";

//review contains a list to the user who wrote it
//the number might represent one of the following based on our choice 
// 1-5 (stars or some similar grading)
// 0-100 (percentage grading)
export type Review = {
    id: number;
    user: User;
    content: String;
    rating: number;
}