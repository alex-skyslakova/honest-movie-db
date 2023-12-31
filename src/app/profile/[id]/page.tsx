// src/app/profile/pages.tsx
import React from 'react';
import BadgeList from '@/components/BadgeList';
import {User} from "@/model/user";
import {UserNameField} from "@/components/UserNameField";
import {getServerAuthSession} from "@/server/auth";
import {getUserById, updateUser} from "@/api/db/user";
import {LoginStatus} from "@/app/LoginStatus";
import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Profile',
}

type ProfilePageProps = {
    params: { id: string };
};

const ProfilePage = async (props: ProfilePageProps) => {
    const {id} = props.params;
    const status = await getServerAuthSession();
    if (!status)
        return (
            <div
                className="flex flex-col h-4/5 w-4/5 dark:bg-neutral-800 m-auto p-5 items-center justify-center gap-y-4 rounded-xl">
                <div>
                    To view profile pages (yours or anyone else&apos;s) you need to sign in
                </div>
                <LoginStatus/>
            </div>
        )
    const user = await getUserById(id, {orderBy: {rating: "desc"}, take: 3, include: {movie: true}}) as User;

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row w-4/5 bg-neutral-100 rounded-xl dark:bg-neutral-800 m-auto mt-5 py-8">
            {/* Left Side */}
            <div className="flex-1 p-8 flex items-center justify-center">
                <div className="max-w-md rounded-lg p-4 flex flex-col items-center">
                    <UserNameField userName={user.name ?? ''} enabled={status?.user?.id == id} saveFunc={saveUserName(id)}/>
                    <p className="text-sm mb-4">{user.email}</p>
                    {
                        user.reviews && user.reviews.length > 0 ?
                            <div className="flex flex-col gap-y-3">
                                <h2 className="text-lg font-semibold mb-8 text-center mt-8">Top reviews</h2>
                                {
                                    (user.reviews).map(review =>
                                        <Link href={`/movies/${review.movieId}`}
                                              className="rounded-2xl p-2 bg-orange-100 dark:bg-yellow-900 flex gap-x-2"
                                              key={review.id}>
                                            <img
                                                src={review.movie?.image}
                                                alt={review.movie?.title}
                                                className="align-middle rounded w-1/4"
                                            />
                                            <div className="flex flex-col grow">
                                                <div className="flex gap-x-1">
                                                    <p className="grow">{review.movie?.title}</p>
                                                    <p className="ml-auto">{`${review.rating}/100`}</p>
                                                </div>
                                                <div className="w-full h-0 border border-white"/>
                                                <p>{review.content.slice(0, 50)}...</p>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                            : ''
                    }
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="p-4 rounded-lg">
                    {user.image ? <img
                        src={user.image}
                        alt="Profile"
                        className="align-middle object-cover rounded border dark:bg-neutral-600 shadow-lg"
                    /> : <img
                        src="img/profile/placeholder-profile.png"
                        alt="Profile"
                        className="align-middle object-cover rounded border dark:bg-neutral-600 shadow-lg"
                    />
                    }
                </div>
                <BadgeList badges={user.badges}/>
            </div>
        </div>
    );
};

export default ProfilePage;

function saveUserName(id: string): (newName: string) => Promise<void> {
    return async (name: string) => {
        'use server'
        await updateUser({id, name});
    }
}