import {prisma} from "@/api/db/client";
import {Vote} from ".prisma/client";


export const getVotesByReviewId = async (reviewId: number) => {
    return prisma.vote.findMany({
        where: {reviewId},
    });
}

export const getVotesByUserId = async (userId: number) => {
    return prisma.vote.findMany({
        where: {userId: userId},
    });
}

export const getVoteByUserIdAndReviewId = async (userId: number, reviewId: number) => {
    return prisma.vote.findFirst({
        where: {userId: userId, reviewId: reviewId},
    });
}

export const getVoteById = async (voteId: number) => {
    return prisma.vote.findUnique({
        where: {id: voteId},
    });
}

export const createVote = async (vote: Vote) => {
    return prisma.vote.create({
        data: vote,
    });
}

export const updateVote = async (vote: Vote) => {
    return prisma.vote.update({
        where: {id: vote.id},
        data: vote,
    });
}

export const deleteVote = async (voteId: number) => {
    return prisma.vote.delete({
        where: {id: voteId},
    });
}

export const GET = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const reviewId = searchParams.get('reviewId');
    const userId = searchParams.get('userId');

    if (userId && isValidUserId() ) {

    }
    return Response.json(getVotesByReviewId(Number(reviewId)));

}

