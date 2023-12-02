import {prisma} from "@/api/db/client";
import {Badge, Prisma} from ".prisma/client";
import BadgeUncheckedCreateInput = Prisma.BadgeUncheckedCreateInput;

const getBadgesByUserId = async (userId: number) => {
    return prisma.user.findUnique({
        where: {id: userId},
        include: {badges: true},
    }).badges;
}

const getBadgeById = async (badgeId: number) => {
    return prisma.badge.findUnique({
        where: {id: badgeId},
    });
}

const createBadge = async (badge: BadgeUncheckedCreateInput) => {
    return prisma.badge.create({
        data: badge,
    });
}

const updateBadge = async (badge: Badge) => {
    return prisma.badge.update({
        where: {id: badge.id},
        data: badge,
    });
}

const addBadgeToUser = async (badgeId: number, userId: number) => {
    return prisma.user.update({
        where: {id: userId},
        data: {
            badges: {
                connect: {id: badgeId},
            },
        },
    });
}

const removeBadgeFromUser = async (badgeId: number, userId: number) => {
    return prisma.user.update({
        where: {id: userId},
        data: {
            badges: {
                disconnect: {id: badgeId},
            },
        },
    });
}

const deleteBadge = async (badgeId: number) => {
    return prisma.badge.delete({
        where: {id: badgeId},
    });
}


export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const badgeId = searchParams.get('badgeId');

    if (userId) {
        return getBadgesByUserId(Number(userId));
    } else if (badgeId) {
        return getBadgeById(Number(badgeId));
    } else {
        return prisma.badge.findMany();
    }
}

export const POST = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const badge = {
        name: searchParams.get('badgeName') ?? 'New Badge',
        image: searchParams.get('badgeImage') ?? '',
    }

    return createBadge(badge);
}

export const PUT = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const badgeId = Number(searchParams.get('badgeId'));
    const originalBadge = await getBadgeById(badgeId);
    if (!originalBadge) {
        return new Response('Badge not found', {status: 404});
    }

    const badge = {
        id: badgeId,
        name: searchParams.get('badgeName') ?? originalBadge.name,
        image: searchParams.get('badgeImage') ?? originalBadge.image
    }
    const updated = updateBadge(badge);
    if (searchParams.get('addUserId')) {
        await addBadgeToUser(badgeId, Number(searchParams.get('userId')));
    }
    if (searchParams.get('removeUserId')) {
        await removeBadgeFromUser(badgeId, Number(searchParams.get('userId')));
    }
    return updated
}

export const DELETE = async (req: Request) => {
    const badgeId = Number(new URL(req.url).searchParams.get('badgeId'));
    const originalBadge = await getBadgeById(badgeId);
    if (!originalBadge) {
        return new Response('Badge not found', {status: 404});
    }

    return deleteBadge(badgeId);
}
