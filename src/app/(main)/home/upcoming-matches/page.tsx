"use client"
import useLeague from "@/app/hooks/use-League";
import { league } from "@/entity/league";
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react";



// const footballGames = [
//   {
//     id: "2ad488c4-25f0-4e74-9955-e169789f0a6b",
//     fixtureId: 1205405,
//     fixtureDate: "2024-09-04T22:00:00.000Z",
//     venueName: "Estadio Metropolitano de Techo",
//     venueCity: "Bogotá, D.C.",
//     statusLong: "Second Half",
//     statusElapsed: 90,
//     leagueDetails: {
//       id: 920,
//       logo: "https://media.api-sports.io/football/leagues/920.png",
//       name: "World Cup - U20 - Women",
//       season: 2024,
//     },
//     teamsDetails: {
//       away: {
//         id: 19090,
//         logo: "https://media.api-sports.io/football/teams/19090.png",
//         name: "Nigeria U20 W",
//       },
//       home: {
//         id: 19084,
//         logo: "https://media.api-sports.io/football/teams/19084.png",
//         name: "Germany U20 W",
//       },
//     },
//     scoreDetails: {
//       fulltime: {
//         away: null,
//         home: null,
//       },
//       halftime: {
//         away: 0,
//         home: 1,
//       },
//     },
//     createdAt: "2024-09-04T23:17:10.909Z",
//     updatedAt: "2024-09-04T23:56:47.937Z",
//   },
//   {
//     id: "2ad488c4-25f0-4e74-9955-e169789f0a6s",
//     fixtureId: 1205405,
//     fixtureDate: "2024-09-04T22:00:00.000Z",
//     venueName: "Estadio Metropolitano de Techo",
//     venueCity: "Bogotá, D.C.",
//     statusLong: "Second Half",
//     statusElapsed: 90,
//     leagueDetails: {
//       id: 920,
//       logo: "https://media.api-sports.io/football/leagues/920.png",
//       name: "World Cup - U20 - Women",
//       season: 2024,
//     },
//     teamsDetails: {
//       away: {
//         id: 19090,
//         logo: "https://media.api-sports.io/football/teams/19090.png",
//         name: "Nigeria U20 W",
//       },
//       home: {
//         id: 19084,
//         logo: "https://media.api-sports.io/football/teams/19084.png",
//         name: "Germany U20 W",
//       },
//     },
//     scoreDetails: {
//       fulltime: {
//         away: null,
//         home: null,
//       },
//       halftime: {
//         away: 0,
//         home: 1,
//       },
//     },
//     createdAt: "2024-09-04T23:17:10.909Z",
//     updatedAt: "2024-09-04T23:56:47.937Z",
//   },
// ]

const FootballSchedule = () => {

  const leagues = useLeague();
  // console.log(leagues);

  return (
    <div className='flex flex-col gap-2 w-12/12 text-white'>
      {((leagues ?? [])).flatMap((league: league) => (
        <Link href={`/home/upcoming-matche`} key={league?.id}>
          <div
            className='border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full'
          >
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center'>
                <img
                  src={league?.logo}
                  alt={league?.name}
                  width={30}
                  height={30}
                  className='mr-2'
                  loading="lazy"
                />
                <span className='text-sm'>{league?.name}</span>
              </div>
            </div>
            <div className='flex items-center justify-between text-[#D5B3FB] mt-4'>
              <button className='bg-black hover:bg-[#422479] text-white font-bold py-1 px-2 text-sm rounded-lg'>
                View Open Bets
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function UpcomingMatches() {
  return (
    <main
      style={{ backgroundImage: `url(/assets/footbal-matches-background.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      className='flex min-h-screen flex-col text-sm px-4 bg-black'>
      <div className='font-bold bg-[var(--primary-purple)] p-2 w-full rounded-lg mt-6'>
        <h2 className='text-[13px] text-center font-semibold text-gray-300'>
          Upcoming football matches
        </h2>
      </div>
      <div className='flex-grow overflow-y-auto mt-4 mb-20'>
        <FootballSchedule />
      </div>
    </main>
  )
}
