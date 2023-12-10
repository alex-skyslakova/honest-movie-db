'use client';
import {Movie} from ".prisma/client";
import React from "react";
import MovieOfThePeriod from "@/components/MovieOfThePeriod";
import SideBarItem from "./SideBarItem";
import {usePathname} from "next/navigation";

type SideBarWrapperProps = {
    movieOfTheWeek: Movie;
    movieOfTheDay: Movie | undefined;
}

export const SideBarWrapper = (props: SideBarWrapperProps) => {
    const pathname = usePathname()
    console.log(pathname)
    const sidebarWidth = pathname === '/' || pathname === null ? '25%' : '15%'

    return (
      <aside className={"sidebar bg-stone-100 dark:bg-stone-800 flex flex-col hidden md:flex "} style={{ width: sidebarWidth }}>
          <SideBarItem title={"Movie of the Week"}>
              {props.movieOfTheDay ? <MovieOfThePeriod {...props.movieOfTheDay}/> : <div>No movie of the week</div>}
          </SideBarItem>

          {props.movieOfTheDay?.id !== props.movieOfTheWeek?.id ?
              <SideBarItem title={"Movie of the Day"}>
              {props.movieOfTheWeek ? <MovieOfThePeriod {...props.movieOfTheWeek}/> : <div>No movie of the day</div>}
              </SideBarItem>
              :
              <div className="sidebar-item flex flex-col items-center p-4 mb-4">
                  <h2 className="text-lg font-semibold mb-4">Add reviews to get personalized pick!</h2>
              </div>
          }
      </aside>
    );
}