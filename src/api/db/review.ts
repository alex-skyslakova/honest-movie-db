import {prisma} from "@/api/db/client";

const getReviewsByMovieId = async (movieId: number, page: number, pageSize: number) => {
    return prisma.review.findMany({
        where: {movieId: movieId},
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
}

const getReviewsByUserId = async (userId: number, page: number, pageSize: number) => {
    return prisma.review.findMany({
        where: {userId: userId},
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
};

export const getReviewById = async (reviewId: number) => {
    return prisma.review.findUnique({
        where: {id: reviewId},
    });
}

export const getReviews = async (page: number, pageSize: number) => {
    return prisma.review.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
}

export const createReview = async (review: any) => {
    return prisma.review.create({
        data: review,
    });
}

export const updateReview = async (review: any) => {
    return prisma.review.update({
        where: {id: review.id},
        data: review,
    });
}

export const deleteReview = async (reviewId: number) => {
    return prisma.review.delete({
        where: {id: reviewId},
    });
}

export const GET_REVIEW = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const reviewId = searchParams.get('reviewId');
    const userId = searchParams.get('userId');
    const movieId = searchParams.get('movieId');
    const page = parseInt(searchParams.get('page') ?? '') ?? 0;
    const pageSize = parseInt(searchParams.get('pageSize') ?? '') ?? 10;

    if (reviewId) {
        return Response.json(getReviewById(Number(reviewId)));
    } else if (userId) {
        return Response.json(getReviewsByUserId(Number(userId), page, pageSize));
    } else if (movieId) {
        return Response.json(getReviewsByMovieId(Number(movieId), page, pageSize));
    } else {
        return Response.json(getReviews(page, pageSize));
    }
}

export const POST_REVIEW = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) {
        return Response.json({error: 'userId is required'});
    }
    const movieId = searchParams.get('movieId');
    if (!movieId) {
        return Response.json({error: 'movieId is required'});
    }
    const review = {
        userId: searchParams.get('userId'),
        movieId: searchParams.get('movieId'),
        rating: searchParams.get('rating') ?? 0,
        content: searchParams.get('content') ?? '',
    }

    return Response.json(createReview(review));
}

export const PUT_REVIEW = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const reviewId = Number(searchParams.get('reviewId'));
    const originalReview = await getReviewById(reviewId);
    if (!originalReview) {
        return new Response('Review not found', {status: 404});
    }

    const review = {
        id: reviewId,
        userId: originalReview.userId,
        movieId: originalReview.movieId,
        rating: searchParams.get('rating') ?? originalReview.rating,
        content: searchParams.get('content') ?? originalReview.content,
    }

    return Response.json(updateReview(review));
}

export const DELETE_REVIEW = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const reviewId = Number(searchParams.get('reviewId'));

    if (!await getReviewById(reviewId)) {
        return new Response('Review not found', {status: 404});
    }

    return Response.json(deleteReview(reviewId));
}
