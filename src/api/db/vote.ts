import {prisma} from "@/api/db/client";
import {Prisma, Vote} from ".prisma/client";
import {isValidUserId} from "@/api/db/user";
import {isValidReviewId} from "@/api/db/review";
import VoteUncheckedCreateInput = Prisma.VoteUncheckedCreateInput;


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

export const createVote = async (vote: VoteUncheckedCreateInput) => {
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

export const GET_VOTE = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const reviewId = parseInt(searchParams.get('reviewId') ?? '');
    const userId = parseInt(searchParams.get('userId') ?? '');
    const validUserId = await isValidUserId(userId);
    const validReviewId = await isValidReviewId(reviewId);

    if (validUserId && validReviewId) {
        return Response.json(getVoteByUserIdAndReviewId(userId, reviewId));
    }
    if (validUserId) {
        return Response.json(getVotesByUserId(userId));
    }
    if (validReviewId) {
        return Response.json(getVotesByReviewId(Number(reviewId)));
    }
    return Response.json({error: 'Invalid parameters'});
}

export const POST_VOTE = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const userId = parseInt(searchParams.get('userId') ?? '');
    const reviewId = parseInt(searchParams.get('reviewId') ?? '');
    const validUserId = await isValidUserId(userId);
    const validReviewId = await isValidReviewId(reviewId);
    if (!validUserId || !validReviewId) {
        return Response.json({error: 'Invalid parameters'});
    }
    const vote = {
        userId: userId,
        reviewId: reviewId,
        isLike: (searchParams.get('isLike')?.toLowerCase() === 'true')
    }
    return Response.json(createVote(vote));
}

export const PUT_VOTE = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const voteId = parseInt(searchParams.get('voteId') ?? '');
    const originalVote = await getVoteById(voteId);
    if (!originalVote) {
        return Response.json({error: 'Invalid parameters'});
    }
    const vote = {
        id: voteId,
        userId: originalVote.userId,
        reviewId: originalVote.reviewId,
        isLike: (searchParams.get('isLike')?.toLowerCase() === 'true')
    }
    return Response.json(updateVote(vote));
}

export const DELETE_VOTE = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const voteId = parseInt(searchParams.get('voteId') ?? '');
    const originalVote = await getVoteById(voteId);
    if (!originalVote) {
        return Response.json({error: 'Invalid parameters'});
    }
    return Response.json(deleteVote(voteId));
}
