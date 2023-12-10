import React from "react";
import {Movie} from ".prisma/client";
import {countMovies, getMovies as getMoviesFromDb} from "@/api/db/movie";
import {getReviewsByUserId} from "@/api/db/review";
import {SideBarWrapper} from "@/components/SideBarWrapper";


const SideBar = async () => {
    const userId = 'clpy3nf4d00003iuxnufepjyv';
    const movieOfTheWeek = await getMovieOfTheWeek();
    const movieOfTheDay = await getMovieOfTheDay(userId);
    return (
        <SideBarWrapper  movieOfTheWeek={movieOfTheWeek} movieOfTheDay={movieOfTheDay}/>
    );
};

const getRandomElement = (list: any[]) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
};

async function getMovieOfTheWeek(): Promise<Movie> {
    'use server'
    const movies = await getMoviesFromDb({page: 1, pageSize: Math.min(await countMovies({page: 1, pageSize: 1000}), 1000)});
    const topMovies = movies.filter(movie => movie.rating >= 80);
    if (topMovies.length == 0) {
        return movies.sort((a, b) => b.rating - a.rating).pop() as Movie;
    }
    return getRandomElement(topMovies);
}


type FrequencyMap = {
    [key: string]: number; // This indicates that frequencyMap can have any number of string keys, each mapping to a number
};

async function getMovieOfTheDay(userId: string): Promise<Movie> {
    // based on the user's most frequent genre, get a random movie from that genre the user hasn't seen
    // if all seen (=reviewed), return random movie from that genre
    // if no reviews, use week selection criteria to pick movie
    'use server'
    const reviews = await getReviewsByUserId(userId, 1, 500);
    if (reviews.length == 0) {
        return getMovieOfTheWeek();
    }
    const genres = reviews.map(review => review.movie.genres).flat();
    const frequencyMap = genres.reduce((acc: FrequencyMap, value) => {
        acc[value.name] = (acc[value.id] || 0) + 1;
        return acc;
    }, {});
    const mostFreqValue = Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
    const movies = await getMoviesFromDb({page: 1, pageSize: 500, genreId: parseInt(mostFreqValue)})
    const notSeenMovies = movies.filter(movie => !reviews.map(review => review.movieId).includes(movie.id));
    if (notSeenMovies.length == 0) {
        return getRandomElement(movies);
    }
    return getRandomElement(notSeenMovies);
}

export default SideBar