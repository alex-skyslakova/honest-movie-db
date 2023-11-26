import {prisma} from "@/api/db/client";

const getReviewsByMovieId = async (movieId: number) => {
    return prisma.review.findMany({
        where: {movieId},
    });
}

const getReviewsByUserId = async (userId: number) => {
    return prisma.review.findMany({
        where: {userId: userId},
    });
};

export const getReviewById = async (reviewId: number) => {
    return prisma.review.findUnique({
        where: {id: reviewId},
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
