'use client';
import SideBarItem from "@/components/SideBarItem";
import React from "react";
import {usePathname} from "next/navigation";
import {Movie} from ".prisma/client";
import MovieOfThePeriod from "@/components/MovieOfThePeriod";
import {getMovies} from "@/api/db/movie";


const SideBar = async () => {
    const pathname = usePathname()
    console.log(pathname)
    const sidebarWidth = pathname === '/' || pathname === null ? '30%' : '15%'

    const movieOfTheWeek = await getMovies({page: 1, pageSize: 1}) as Movie[];
    const movie = movieOfTheWeek.pop();
    const movieOfTheDay = {
        id: 567,
        title: "The Matrix",
        description: "A sci-fi classic about an alternate reality.",
        image: "/img/movies/phantom-of-the-opera.png",
        rating: 90,
    } as Movie;
    return (
        <aside className={"sidebar bg-stone-100 dark:bg-stone-800 flex flex-col hidden md:flex "} style={{ width: sidebarWidth }}>
            <SideBarItem title={"Movie of the Week"}>
                {movie ? <MovieOfThePeriod {...movie}/> : <div>No movie of the week</div>}
            </SideBarItem>

            <SideBarItem title={"Movie of the Day"}>
                {movie ? <MovieOfThePeriod {...movie}/> : <div>No movie of the day</div>}
            </SideBarItem>
        </aside>
    );
};

export default SideBar;