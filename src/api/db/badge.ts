import {prisma} from "@/api/db/client";
import {Badge} from ".prisma/client";

export const getBadgesByUserId = async (userId: number) => {
    return prisma.user.findUnique({
        where: {id: userId},
        include: {badges: true},
    }).badges;
}

export const getBadgeById = async (badgeId: number) => {
    return prisma.badge.findUnique({
        where: {id: badgeId},
    });
}

export const createBadge = async (badge: Badge) => {
    return prisma.badge.create({
        data: badge,
    });
}

export const updateBadge = async (badge: Badge) => {
    return prisma.badge.update({
        where: {id: badge.id},
        data: badge,
    });
}

export const deleteBadge = async (badgeId: number) => {
    return prisma.badge.delete({
        where: {id: badgeId},
    });
}
