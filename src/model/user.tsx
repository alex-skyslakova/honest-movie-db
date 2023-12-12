//Represents a user
//badges: list of badges that will be displayed in user's profile
import {Review} from "@/model/review";
import {Badge} from "@/model/badge";

export type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    badges: Badge[];
    reviews: Review[];
}