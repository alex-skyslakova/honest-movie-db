import { Badge } from "./badge";

//Represents a user
//badges: list of badges that will be displayed in user's profile
//this model will probably contain much more fields (authentication issue)
export type User = {
    id: String;
    name: String | null;
    badges: Badge[];
}