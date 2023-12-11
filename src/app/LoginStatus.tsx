// src/app/LoginStatus.tsx

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from "next/link";

export const LoginStatus = ({small = false} : {small: boolean}) => {
  const { data, status } = useSession();
  if (status === 'loading') return (
      <div className={`flex  gap-3 items-center bg-black bg-opacity-80 rounded-lg border border-white${!small ? ' p-10 text-lg' : ' p-2'}`}>
          loading...
      </div>
  );
  if (status === 'unauthenticated') {
    return (
      <div className={`flex  gap-3 items-center bg-black bg-opacity-80 rounded-lg border border-white${!small ? ' p-10 text-lg' : ' p-2'}`}>
        <button
          onClick={() => signIn('discord')}
          className={!small ? "rounded border border-white p-3" : ''}
        >
          Sign in with Discord
        </button>
      </div>
    );
  }
  return (
    <div className={`flex gap-3 items-center bg-black bg-opacity-80 rounded-lg border border-white${!small ? ' p-10 text-lg' : ' p-2'}`}>
      <Link href={`/profile/${data?.user.id}`}>
        Welcome, {data?.user.name}
      </Link>
      <button
        onClick={() => signOut()}
        className={!small ? "rounded border border-white p-3" : ''}
      >
        Sign out
      </button>
    </div>
  );
};