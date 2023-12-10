import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Navbar} from "@/components/Navbar";

import { Providers } from './Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar/>
            <main className="flex min-h-screen flex-col bg-white dark:bg-black">
                {children}
            </main>
          <footer className="py-2 px-4 mt-auto text-right dark:bg-stone-600">React project 2023</footer>
        </Providers>
      </body>
    </html>
  )
}
