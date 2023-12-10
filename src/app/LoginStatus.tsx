// src/app/LoginStatus.tsx

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from "next/link";

export const LoginStatus = () => {
  const { data, status } = useSession();
  if (status === 'loading') return <div>loading...</div>;
  if (status === 'unauthenticated') {
    return (
      <div>
        <button
          onClick={() => signIn('discord')}
          className="rounded border border-white p-3"
        >
          Sign in with Discord
        </button>
      </div>
    );
  }
  return (
    <div className="flex gap-3 items-center">
      <Link href={`/profile/${data?.user.id}`}>
        Hi, {data?.user.name}
      </Link>
      <button
        onClick={() => signOut()}
        className="rounded border border-white p-3"
      >
        Sign out
      </button>
    </div>
  );
};