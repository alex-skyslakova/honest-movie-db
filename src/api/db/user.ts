import {prisma} from "@/api/db/client";
import {Prisma, User} from ".prisma/client";
import UserUncheckedCreateInput = Prisma.UserUncheckedCreateInput;
import UserUncheckedUpdateInput = Prisma.UserUncheckedUpdateInput;

export const getUserById = async (userId: string) => {
    return prisma.user.findUnique({
        where: {id: userId},
        include: {
            badges: true,
        }
    });
}

export const createUser = async (user: UserUncheckedCreateInput) => {
    return prisma.user.create({
        data: user,
    });
}

export const updateUser = async (user: UserUncheckedUpdateInput) => {
    if (user.id === undefined || !await isValidUserId(user.id.toString())) {
        return null;
    }
    return prisma.user.update({
        where: {id: user.id.toString()},
        data: user,
    });
}

export const deleteUser = async (userId: string) => {
    return prisma.user.delete({
        where: {id: userId},
    });
}

export const isValidUserId = async (userId: string) => {
    return prisma.user.findUnique({
        where: {id: userId},
    }) !== null;
}

export const GET_USER = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (userId && await isValidUserId(userId)) {
            const user = await getUserById(userId);
            if (user) {
                return Response.json(user);
            } else {
                return Response.json({ error: 'User not found' }, { status: 404 });
            }
        } else {
            return Response.json({ error: 'Invalid userId' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error in GET_USER:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const POST_USER = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const user = {
        name: searchParams.get('userName') ?? 'New User',
        image: searchParams.get('userImage') ?? '',
    }

    return Response.json(createUser(user));
}

export const PUT_USER = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('userId');
    const originalUser = await getUserById(userId ?? '');
    if (!originalUser) {
        return new Response('User not found', {status: 404});
    }

    const user = {
        id: userId ?? '',
        name: searchParams.get('userName') ?? originalUser.name,
        image: searchParams.get('userImage') ?? originalUser.image,
    }

    return Response.json(updateUser(user));
}

export const DELETE_USER = async (req: Request) => {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('userId');

    if (userId === null || !await isValidUserId(userId)) {
        return new Response('User not found', {status: 404});
    }

    return Response.json(deleteUser(userId));
}
