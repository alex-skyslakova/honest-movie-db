//Represents a user
//badges: list of badges that will be displayed in user's profile
import {Badge} from ".prisma/client";
import {Review} from "@/model/review";

export type User = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    badges: Badge[];
    reviews: Review[];
}