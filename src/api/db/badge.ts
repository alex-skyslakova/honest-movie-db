import {prisma} from "@/api/db/client";
import {Badge, Prisma} from ".prisma/client";
import BadgeUncheckedCreateInput = Prisma.BadgeUncheckedCreateInput;

const getBadgesByUserId = async (userId: string) => {
    return prisma.user.findMany({
        where: {id: userId},
        include: {badges: true},
    });
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

const addBadgeToUser = async (badgeId: number, userId: string) => {
    return prisma.user.update({
        where: {id: userId},
        data: {
            badges: {
                connect: {id: badgeId},
            },
        },
    });
}

const removeBadgeFromUser = async (badgeId: number, userId: string) => {
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


export const GET_BADGE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const badgeId = searchParams.get('badgeId');

        if (userId) {
            const userBadges = await getBadgesByUserId(userId);
            return new Response(JSON.stringify(userBadges), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else if (badgeId) {
            const badge = await getBadgeById(Number(badgeId));
            if (badge) {
                return new Response(JSON.stringify(badge), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else {
                return new Response('Badge not found', { status: 404 });
            }
        } else {
            const allBadges = await prisma.badge.findMany();
            return new Response(JSON.stringify(allBadges), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
};

export const POST_BADGE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const badge = {
            name: searchParams.get('badgeName') ?? 'New Badge',
            image: searchParams.get('badgeImage') ?? '',
        };

        const newBadge = await createBadge(badge);
        return new Response(JSON.stringify(newBadge), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
};

export const PUT_BADGE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const badgeId = Number(searchParams.get('badgeId'));
        const originalBadge = await getBadgeById(badgeId);
        if (!originalBadge) {
            return new Response('Badge not found', { status: 404 });
        }

        const badge = {
            id: badgeId,
            name: searchParams.get('badgeName') ?? originalBadge.name,
            image: searchParams.get('badgeImage') ?? originalBadge.image,
        };

        const updatedBadge = await updateBadge(badge);

        if (searchParams.get('addUserId')) {
            await addBadgeToUser(badgeId, searchParams.get('userId') ?? '');
        }
        if (searchParams.get('removeUserId')) {
            await removeBadgeFromUser(badgeId, searchParams.get('userId') ?? '');
        }

        return new Response(JSON.stringify(updatedBadge), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
};

export const DELETE_BADGE = async (req: Request) => {
    try {
        const badgeId = Number(new URL(req.url).searchParams.get('badgeId'));
        const originalBadge = await getBadgeById(badgeId);
        if (!originalBadge) {
            return new Response('Badge not found', { status: 404 });
        }

        const deletedBadge = await deleteBadge(badgeId);
        return new Response(JSON.stringify(deletedBadge), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
};
