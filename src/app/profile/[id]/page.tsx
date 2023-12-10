// src/app/profile/pages.tsx
import React from 'react';
import BadgeList from '@/components/BadgeList';
import { User } from '@/model/user';
import {UserNameField} from "@/components/UserNameField";
import {getServerAuthSession} from "@/server/auth";
import {getUserById, updateUser} from "@/api/db/user";
import {LoginStatus} from "@/app/LoginStatus";


const ProfilePage: React.FC = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const status = await getServerAuthSession();
  if (!status)
    return (
        <div className="flex flex-col h-4/5 w-4/5 dark:bg-neutral-800 m-auto p-5 items-center justify-center gap-y-4 rounded-xl">
            <div>
                To view profile pages (yours or anyone else's) you need to sign in
            </div>
            <LoginStatus/>
        </div>
    )
  const user: User = status?.user?.id == id ? status.user : await getUserById(id)

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-4/5 w-4/5 dark:bg-neutral-800 m-auto">
      {/* Left Side */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="max-w-md rounded-lg p-4 flex flex-col items-center">
          <UserNameField userName={user.name} saveFunc={saveUserName(id)}/>
          <p className="text-sm mb-4">{user.email}</p>
          <BadgeList badges={user.badges}/>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center w-2/4">
        <div className="p-4 rounded-lg">
          <img
              src="/img/profile/placeholder-profile.png"
              alt="Profile"
              className="w-3/4 h-3/4 align-middle object-cover rounded border dark:bg-neutral-600 shadow-lg"
          />
        </div>
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