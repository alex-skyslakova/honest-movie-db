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
    const userId = useSession()?.data?.user?.id || null;
    const [movies, setMovies] = useState<MoviesState>({
        movieOfTheDay: undefined,
        movieOfTheWeek: undefined,
    });

    useEffect(() => {
        async function fetchMovies() {
            const selectedMovies = await getSelectedMovies(userId);
            setMovies(selectedMovies);
        }

        fetchMovies();
    }, [userId]);

    return (
        <aside
            className="sidebar bg-stone-100 dark:bg-stone-800 hidden md:flex flex-col h-full"
            style={{ width: '20%', position: 'fixed', overflowY: 'auto' }}
        >
            <style jsx>{`
                /* Custom scrollbar styles */
                .sidebar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
                }

                .sidebar:hover {
                    scrollbar-color: rgba(0, 0, 0, 0.5) transparent;
                }
            `}</style>

            <SideBarItem title="Movie of the Week">
                {movies.movieOfTheWeek ? (
                    <MovieOfThePeriod {...movies.movieOfTheWeek} />
                ) : (
                    <div>No movie of the week</div>
                )}
            </SideBarItem>
            {userId &&
                (movies.movieOfTheDay?.id !== movies.movieOfTheWeek?.id ? (
                    <SideBarItem title="Movie of the Day">
                        {movies.movieOfTheDay ? (
                            <MovieOfThePeriod {...movies.movieOfTheDay} />
                        ) : (
                            <div>No movie of the day</div>
                        )}
                    </SideBarItem>
                ) : (
                    <div className="sidebar-item flex flex-col items-center p-4 mb-4">
                        <h2 className="text-lg font-semibold mb-4">
                            Add reviews to get personalized pick!
                        </h2>
                    </div>
                ))}
        </aside>
    );
};

export default SideBar;