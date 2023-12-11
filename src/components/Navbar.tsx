'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useRef} from "react";
import {useSession} from "next-auth/react";
import {LoginStatus} from "@/app/LoginStatus";

export const Navbar = () => {
    const pathname = usePathname();
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const { data, status } = useSession();
    let paths = [['Home', '/'], ['Movies', '/movies']]
    if (status == 'authenticated')
        paths.push(['Profile', `/profile/${data?.user?.id}`])
    return (
        <nav className="bg-stone-100 dark:bg-stone-800 flex px-10">
            <ul className="grow mx-auto gap-x-6 px-10 text-black dark:text-white hidden md:flex">
                {paths.map(([name, route]) =>
                    <li key={route} className={"py-4 px-2 border-b-2 " + (pathname === route ? "border-yellow-700" : "border-transparent hover:border-gray-300 dark:hover:border-gray-400")}>
                        <Link href={route}>
                            {name}
                        </Link>
                    </li>
                )}
            </ul>
            <div className="my-auto text-black dark:text-white">
                <LoginStatus small={true}/>
            </div>
            <button className="md:hidden flex flex-col gap-y-2 p-3" onClick={() => dialogRef.current?.show()}>
                <div className="h-1 w-8 bg-black dark:bg-white rounded"/>
                <div className="h-1 w-8 bg-black dark:bg-white rounded"/>
                <div className="h-1 w-8 bg-black dark:bg-white rounded"/>
            </button>
            <dialog ref={dialogRef} className="fixed left-0 top-0 w-full items-center justify-center container [&[open]]:flex flex-col gap-y-6 bg-stone-100 dark:bg-stone-800 text-black dark:text-white">
                <button className="flex flex-col gap-y-2 p-3 self-end" onClick={() => dialogRef.current?.close()}>
                    Close
                </button>
                {[['Home', '/'], ['Movies', '/movies'], ['Profile', '/profile']].map(([name, route]) =>
                    <Link key={route} className={"py-4 px-2 border-b-2 " + (pathname === route ? "border-yellow-700" : "border-transparent hover:border-gray-300 dark:hover:border-gray-400")} href={route}>
                        {name}
                    </Link>
                )}
            </dialog>
        </nav>
    );
}