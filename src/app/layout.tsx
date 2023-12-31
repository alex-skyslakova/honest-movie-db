import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import SideBar from '@/components/SideBar';

import { Providers } from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: '%s | Honest DB',
        default: 'Honest DB'
    },
    description: 'Database with movies and user reviews.',
    metadataBase: new URL(process.env.DEPLOY_URL ?? 'http://localhost:3000')
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                {/* Navbar in front */}
                <Navbar />
            </div>
            <main className="flex min-h-screen bg-white dark:bg-black mt-[56px]">
                {/* 64px is an example value. Adjust based on your Navbar's height */}
                {/* Sidebar with top margin */}
                <div className="fixed left-0 h-full bg-gray-200 w-[20%]">
                    <SideBar />
                </div>
                {/* Main content */}
                <div className="ml-[20%] w-full">{children}</div>
            </main>
        </Providers>
        <footer className="py-2 px-4 mt-auto text-right dark:bg-stone-600">
            React project 2023
        </footer>
        </body>
        </html>
    );
}
