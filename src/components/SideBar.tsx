'use client';
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {getSelectedMovies} from "@/server/movieSelection";
import SideBarItem from "@/components/SideBarItem";
import MovieOfThePeriod from "@/components/MovieOfThePeriod";
import {Movie} from ".prisma/client";

type MoviesState = {
    movieOfTheDay: Movie | undefined;
    movieOfTheWeek: Movie | undefined;
}

const SideBar = () => {
    const pathname = usePathname();
    const sidebarWidth = pathname === '/' || pathname === null ? '25%' : '15%'
    const userId = useSession()?.data?.user?.id || null;
    const [movies, setMovies] = useState<MoviesState>({ movieOfTheDay: undefined, movieOfTheWeek: undefined });

    useEffect(() => {
        async function fetchMovies() {
            const selectedMovies = await getSelectedMovies(userId);
            setMovies(selectedMovies);
        }

        fetchMovies();
    }, [userId]);

    return (
        <aside className={"sidebar bg-stone-100 dark:bg-stone-800 flex flex-col hidden md:flex "} style={{ width: sidebarWidth }}>
            <SideBarItem title={"Movie of the Week"}>
                {movies.movieOfTheWeek ? <MovieOfThePeriod {...movies.movieOfTheWeek}/> : <div>No movie of the week</div>}
            </SideBarItem>
            { userId && (movies.movieOfTheDay?.id !== movies.movieOfTheWeek?.id ?
                    <SideBarItem title={"Movie of the Day"}>
                        {movies.movieOfTheDay ? <MovieOfThePeriod {...movies.movieOfTheDay}/> : <div>No movie of the day</div>}
                    </SideBarItem>
                    :
                    <div className="sidebar-item flex flex-col items-center p-4 mb-4">
                        <h2 className="text-lg font-semibold mb-4">Add reviews to get personalized pick!</h2>
                    </div>
                )
            }
        </aside>
    );
};

export default SideBar