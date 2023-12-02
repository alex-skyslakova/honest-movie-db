import {prisma} from "@/api/db/client";
import {Movie, Prisma} from ".prisma/client";
import MovieUncheckedCreateInput = Prisma.MovieUncheckedCreateInput;


// if filter field is 'undefined', filter is ignored
// see https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
type movieParams = {
    genreId?: number,
    namePrefix?: string,
    rating?: number,
    page: number,
    pageSize: number
}

export const getMovies = async (movieParams: movieParams) => {
    // Calculate pagination parameters
    const skip = (movieParams.page - 1) * movieParams.pageSize;
    const take = movieParams.pageSize;

    return prisma.movie.findMany({
        where: {
            AND: [
                {
                    title: {
                        startsWith: movieParams.namePrefix,
                    }
                },
                {
                    genres: {
                        some: {
                            id: {
                                equals: movieParams.genreId != null ? movieParams.genreId : undefined,
                            }
                        }
                    }
                },
                {
                    rating: {
                        gte: movieParams.rating,
                    }
                }
            ],
        },
        skip: skip,
        take: take,
        include: {
            genres: true,
            reviews: true,
        },
    });
}

export const getMovieById = async (movieId: number) => {
    return prisma.movie.findUnique({
        where: {id: movieId},
    });
};

export const createMovie = async (movie: MovieUncheckedCreateInput) => {
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

export const GET_MOVIE = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('movieId');
    const page = parseInt(searchParams.get('page') ?? '') ?? 0;
    const pageSize = parseInt(searchParams.get('pageSize') ?? '') ?? 10;
    if (id) {
        return Response.json(getMovieById(parseInt(id)));
    }

    if (page < 0 || pageSize < 0) {
        return Response.json({error: 'Invalid pagination parameters'});
    }

    const filterByGenre = searchParams.get('filterGenreId');
    const filterByName = searchParams.get('filterNamePrefix');
    const filterByRating = searchParams.get('filterRating');
    const params: movieParams = {page: page, pageSize: pageSize}

    if (filterByGenre) {
        params.genreId = parseInt(filterByGenre);
    }
    if (filterByName) {
        params.namePrefix = filterByName;
    }
    if (filterByRating) {
        params.rating = parseInt(filterByRating);
    }

    return Response.json(getMovies(params));
}

export const POST_MOVIE = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    // expects that genre ids are saved as comma separated string
    const genreList = searchParams.get('movieGenreIdList')?.split(",");
    if (genreList) {
        genreList.map((genreId) => parseInt(genreId));
    }
    const movie = {
        title: searchParams.get('movieTitle') ?? 'New Movie',
        description: searchParams.get('movieDescription') ?? '',
        image: searchParams.get('movieImage') ?? '',
        rating: 0,
        genres: genreList?.map(id => ({id: id }) || []),
    } as MovieUncheckedCreateInput;

    return Response.json(createMovie(movie));
}

export const PUT_MOVIE = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const movieId = parseInt(searchParams.get('movieId') ?? '');
    const originalMovie = await getMovieById(movieId);
    if (!originalMovie) {
        return new Response('Movie not found', {status: 404});
    }

    const genreList = searchParams.get('movieGenreIdList')?.split(",");
    if (genreList) {
        genreList.map((genreId) => parseInt(genreId));
    }
    const movie = {
        id: movieId,
        title: searchParams.get('movieTitle') ?? originalMovie.title,
        description: searchParams.get('movieDescription') ?? originalMovie.description,
        image: searchParams.get('movieImage') ?? originalMovie.image,
        rating: originalMovie.rating,
        genres: genreList?.map(id => ({id: id }) || []),
    } as Movie;

    return Response.json(updateMovie(movie));
}

export const DELETE_MOVIE = async (req: Request) => {
    const movieId = parseInt(new URL(req.url).searchParams.get('movieId') ?? '');
    const originalMovie = await getMovieById(movieId);
    if (!originalMovie) {
        return new Response('Movie not found', {status: 404});
    }

    return Response.json(deleteMovie(movieId));
}