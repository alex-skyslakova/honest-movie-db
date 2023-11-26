import {prisma} from "@/api/db/client";
import {User} from ".prisma/client";

export const getUserById = async (userId: number) => {
    return prisma.user.findUnique({
        where: {id: userId},
    });
}

export const createUser = async (user: User) => {
    return prisma.user.create({
        data: user,
    });
}

export const updateUser = async (user: User) => {
    return prisma.user.update({
        where: {id: user.id},
        data: user,
    });
}

export const deleteUser = async (userId: number) => {
    return prisma.user.delete({
        where: {id: userId},
    });
}

