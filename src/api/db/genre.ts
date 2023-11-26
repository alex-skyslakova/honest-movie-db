import {prisma} from "@/api/db/client";
import {Genre} from ".prisma/client";


export const getGenres = async () => {
    return prisma.genre.findMany();
}


export const getGenreById = async (genreId: number) => {
    return prisma.genre.findUnique({
        where: {id: genreId},
    });
}

export const createGenre = async (genre: Genre) => {
    return prisma.genre.create({
        data: genre,
    });
}

export const updateGenre = async (genre: Genre) => {
    return prisma.genre.update({
        where: {id: genre.id},
        data: genre,
    });
}

export const deleteGenre = async (genreId: number) => {
    return prisma.genre.delete({
        where: {id: genreId},
    });
}
