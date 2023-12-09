
import MovieOfThePeriod from "@/components/MovieOfThePeriod";
import SideBarItem from "@/components/SideBarItem";
import React from "react";


const SideBar = () => {

    const movieOfTheWeek = {
        title: "Inception",
        description: "A thriller about dreams within dreams.",
        imageUrl: "/img/movies/phantom-of-the-opera.png"
    };

    const movieOfTheDay = {
        title: "The Matrix",
        description: "A sci-fi classic about an alternate reality.",
        imageUrl: "/img/movies/phantom-of-the-opera.png"
    };
    return (
        <aside className="sidebar w-64 bg-stone-100 dark:bg-stone-800 flex flex-col hidden md:flex">
            <SideBarItem title={"Movie of the Week"}>
                <MovieOfThePeriod title={movieOfTheWeek.title} description={movieOfTheWeek.description} imageUrl={movieOfTheWeek.imageUrl}/>
            </SideBarItem>

            <SideBarItem title={"Movie of the Day"}>
                <MovieOfThePeriod title={movieOfTheDay.title} description={movieOfTheDay.description} imageUrl={movieOfTheDay.imageUrl}/>
            </SideBarItem>
        </aside>
    );
};

export default SideBar;