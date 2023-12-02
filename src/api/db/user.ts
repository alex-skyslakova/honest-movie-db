import {prisma} from "@/api/db/client";
import {Prisma, User} from ".prisma/client";
import UserUncheckedCreateInput = Prisma.UserUncheckedCreateInput;

export const getUserById = async (userId: number) => {
    return prisma.user.findUnique({
        where: {id: userId},
    });
}

export const createUser = async (user: UserUncheckedCreateInput) => {
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

export const isValidUserId = async (userId: number) => {
    return prisma.user.findUnique({
        where: {id: userId},
    }) !== null;
}

export const GET_USER = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('userId');
    if (userId && await isValidUserId(Number(userId))) {
        return Response.json(getUserById(Number(userId)));
    } else {
        return Response.json({error: 'Invalid userId'});
    }
}

export const POST_USER = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const user = {
        name: searchParams.get('userName') ?? 'New User',
        profilePicture: searchParams.get('userProfilePicture') ?? '',
    }

    return Response.json(createUser(user));
}

export const PUT_USER = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const userId = Number(searchParams.get('userId'));
    const originalUser = await getUserById(userId);
    if (!originalUser) {
        return new Response('User not found', {status: 404});
    }

    const user = {
        id: userId,
        name: searchParams.get('userName') ?? originalUser.name,
        profilePicture: searchParams.get('userProfilePicture') ?? originalUser.profilePicture,
    }

    return Response.json(updateUser(user));
}

export const DELETE_USER = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const userId = Number(searchParams.get('userId'));

    if (!await isValidUserId(userId)) {
        return new Response('User not found', {status: 404});
    }

    return Response.json(deleteUser(userId));
}
