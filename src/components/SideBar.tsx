import SideBarItem from "@/components/SideBarItem";
import React from "react";
import {usePathname} from "next/navigation";
import {Movie} from ".prisma/client";
import MovieOfThePeriod from "@/components/MovieOfThePeriod";
import {getMovies as getMoviesFromDb} from "@/api/db/movie";
import {MovieOptions} from "@/model/movie";
import {SideBarWrapper} from "@/components/SideBarWrapper";


const SideBar = async () => {

    const movieOfTheWeek = await getMovies( 1, 1);
    const movie = movieOfTheWeek.pop() as Movie;
    const movieOfTheDay = {
        id: 567,
        title: "The Matrix",
        description: "A sci-fi classic about an alternate reality.",
        image: "/img/movies/phantom-of-the-opera.png",
        rating: 90,
    } as Movie;
    return (
        <SideBarWrapper  movieOfTheWeek={movie} movieOfTheDay={movie}/>
    );
};

async function getMovies(page: number, pageSize: number): Promise<Movie[]> {
    'use server'
    const movies = await getMoviesFromDb({page: page, pageSize: pageSize})
    return movies as Movie[]
}

export default SideBar;