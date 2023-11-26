import {prisma} from "@/api/db/client";
import {Movie} from ".prisma/client";

export const getMovies = async () => {
    return prisma.movie.findMany();
};

export const getMovieById = async (movieId: number) => {
    return prisma.movie.findUnique({
        where: {id: movieId},
    });
};

export const createMovie = async (movie: Movie) => {
    return prisma.movie.create({
        data: movie,
    });
}

export const updateMovie = async (movie: Movie) => {
    return prisma.movie.update({
        where: {id: movie.id},
        data: movie,
    });
}

export const deleteMovie = async (movieId: number) => {
    return prisma.movie.delete({
        where: {id: movieId},
    });
}
