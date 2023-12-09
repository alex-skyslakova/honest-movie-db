// src/app/Providers.tsx

'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => (
  <SessionProvider>{children}</SessionProvider>
);