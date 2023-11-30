import {prisma} from "@/api/db/client";
import {Genre, Prisma} from ".prisma/client";
import GenreUncheckedCreateInput = Prisma.GenreUncheckedCreateInput;


export const getGenres = async () => {
    return prisma.genre.findMany();
}


export const getGenreById = async (genreId: number) => {
    return prisma.genre.findUnique({
        where: {id: genreId},
    });
}

const createGenre = async (
    genre: GenreUncheckedCreateInput // allows passing Genre without id
) => {
    return prisma.genre.create({
        data: genre,
    });
}

const updateGenre = async (genre: Genre) => {
    return prisma.genre.update({
        where: {id: genre.id},
        data: genre,
    });
}

const deleteGenre = async (genreId: number) => {
    return prisma.genre.delete({
        where: {id: genreId},
    });
}

const isValidGenreId = async (genreId: number) => {
    return getGenreById(genreId) !== null;
}


export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('genreId');
    if (id) {
        return Response.json(getGenreById(parseInt(id)));
    }
    return Response.json(getGenres());
}

export const POST = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const genre = {
        name: searchParams.get('genreName') ?? 'New Genre',
    }

    return Response.json(createGenre(genre));
}

export const PUT = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const genre = {
        id: parseInt(searchParams.get('genreId') ?? ''),
        name: searchParams.get('genreName') ?? 'New Genre',
    }

    if (!isValidGenreId(genre.id)) {
        return new Response('Genre not found', { status: 404 });
    }

    return Response.json(updateGenre(genre));
}

export const DELETE = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const genreId = parseInt(searchParams.get('genreId') ?? '');

    if (!isValidGenreId(genreId)) {
        return new Response('Genre not found', { status: 404 });
    }

    return Response.json(deleteGenre(genreId));
}
