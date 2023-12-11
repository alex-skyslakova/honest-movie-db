// src/app/Providers.tsx

'use client';

import { MoviesContextProvider } from '@/components/MoviesContextProvider';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => (

    <SessionProvider>
        <MoviesContextProvider>
            {children}
        </MoviesContextProvider>
    </SessionProvider>
);