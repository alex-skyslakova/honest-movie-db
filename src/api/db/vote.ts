import {prisma} from "@/api/db/client";
import {Prisma, Vote} from ".prisma/client";
import {isValidUserId} from "@/api/db/user";
import {isValidReviewId} from "@/api/db/review";
import VoteUncheckedCreateInput = Prisma.VoteUncheckedCreateInput;


export const getVotesByReviewId = async (reviewId: number) => {
    return prisma.vote.findMany({
        where: {reviewId: reviewId},
    });
}

export const getVotesByUserId = async (userId: string) => {
    return prisma.vote.findMany({
        where: {userId: userId},
    });
}

export const getVoteByUserIdAndReviewId = async (userId: string, reviewId: number) => {
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
        where: { id: vote.id },
        data: vote,
    });
};

export const deleteVote = async (voteId: number) => {
    return prisma.vote.delete({
        where: {id: voteId},
    });
}

export const GET_VOTE = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const reviewId = parseInt(searchParams.get('reviewId') ?? '');
    const userId = searchParams.get('userId') ?? '';
    const validUserId = await isValidUserId(userId);
    const validReviewId = await isValidReviewId(reviewId);

    if (validUserId && validReviewId) {
        return Response.json(await getVoteByUserIdAndReviewId(userId, reviewId));
    }
    if (validUserId) {
        return Response.json(await getVotesByUserId(userId));
    }
    if (validReviewId) {
        return Response.json(await getVotesByReviewId(Number(reviewId)));
    }
    return Response.json({error: 'Invalid parameters'});
}

export const POST_VOTE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId') ?? '';
        const reviewId = parseInt(searchParams.get('reviewId') ?? '');
        const validUserId = await isValidUserId(userId);
        const validReviewId = await isValidReviewId(reviewId);

        if (!validUserId || !validReviewId) {
            return Response.json({ error: 'Invalid parameters' });
        }

        const isLike = searchParams.get('isLike')?.toLowerCase() === 'true';
        const vote = {
            userId: userId,
            reviewId: reviewId,
            isLike: isLike,
        };

        const createdVote = await createVote(vote);

        return Response.json(createdVote);
    } catch (error) {
        console.error('Error creating vote:', error);
        return Response.json({ error: `Error creating vote: ${error.message || 'Unknown error'}` }, { status: 500 });
    }
};

export const PUT_VOTE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const voteId = parseInt(searchParams.get('voteId') ?? '');
        const originalVote = await getVoteById(voteId);

        if (!originalVote) {
            return Response.json({ error: 'Invalid parameters' });
        }

        const isLike = searchParams.get('isLike')?.toLowerCase() === 'true';
        const updatedVote = {
            id: voteId,
            userId: originalVote.userId,
            reviewId: originalVote.reviewId,
            isLike: isLike,
        };

        const result = await updateVote(updatedVote);

        return Response.json(result);
    } catch (error) {
        console.error('Error updating vote:', error);
        return Response.json({ error: `Error updating vote: ${error.message || 'Unknown error'}` }, { status: 500 });
    }
};


export const DELETE_VOTE = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const voteId = parseInt(searchParams.get('voteId') ?? '');
    const originalVote = await getVoteById(voteId);
    if (!originalVote) {
        return Response.json({error: 'Invalid parameters'});
    }
    return Response.json(await deleteVote(voteId));
}
