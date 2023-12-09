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
    return await getGenreById(genreId) !== null;
}


export const GET_GENRE = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('genreId');
    if (id) {
        return Response.json(await getGenreById(parseInt(id)));
    }
    return Response.json(await getGenres());
}

export const POST_GENRE = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const genre = {
        name: searchParams.get('genreName') ?? 'New Genre',
    }

    return Response.json(await createGenre(genre));
}

export const PUT_GENRE = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const genre = {
        id: parseInt(searchParams.get('genreId') ?? ''),
        name: searchParams.get('genreName') ?? 'New Genre',
    }

    if (!await isValidGenreId(genre.id)) {
        return new Response('Genre not found', { status: 404 });
    }

    return Response.json(await updateGenre(genre));
}

export const DELETE_GENRE = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const genreId = parseInt(searchParams.get('genreId') ?? '');

    if (!await isValidGenreId(genreId)) {
        return new Response('Genre not found', { status: 404 });
    }

    return Response.json(await deleteGenre(genreId));
}
