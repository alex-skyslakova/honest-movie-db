import { User } from "./user";

//review contains a link to the user who wrote it
export type Review = {
    id: number;
    user: User;
    content: String;
    rating: number; // 0-100 (percentage grading)
    likes: number;
    dislikes: number;
}