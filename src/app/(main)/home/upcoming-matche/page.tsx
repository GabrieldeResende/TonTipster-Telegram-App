"use client"
import React from 'react';
import Link from "next/link";
import Image from "next/image"
import useMatches from '@/app/hooks/use-Matches';
import { match } from '@/entity/match';

export default function MatchesEvents() {

    const MatchesSchedule = () => {

        const matches = useMatches()
        console.log(matches);


        return (
            <div className='flex flex-col gap-2 w-12/12'>
                {((matches ?? [])).flatMap((matches: match) => (
                    <Link href={`/bets/open-bets`}>
                        <div className='border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full'>
                            <div className='flex justify-between items-center mb-2'>
                                <div className='flex items-center'>
                                    <div className='flex flex-col justify-center'>
                                        <Image
                                            src={matches.home.logo}
                                            alt={matches.home.name}
                                            width={30}
                                            height={30}
                                            className='mr-2'
                                        />
                                    </div>
                                    <div className='flex flex-col ml-4'>
                                        <span className='text-[12px] text-white'>{matches.home.name}</span>
                                    </div>
                                </div>
                                <div className='text-white text-center'>
                                    <h1>Versus</h1>
                                </div>
                                <div className='flex items-center'>
                                    <div className='flex flex-col mr-4 text-end'>
                                        <span className='text-[10px] text-grey'>{matches.away.logo}</span>
                                        <span className='text-[12px] text-white'>{matches.away.logo}</span>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <Image
                                            src={matches.away.logo}
                                            alt={matches.away.logo}
                                            width={30}
                                            height={30}
                                            className='mr-2'
                                        />
                                        <h1 className='text-[10px] mt-2 text-white'>{matches.away.logo}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text-[#D5B3FB] mt-4'>
                                <div>
                                    <p>{matches.date}</p>
                                </div>
                                <Link href="/bets/post-bet">
                                    <button className='bg-black hover:bg-[#422479] text-white font-bold py-1 px-2 text-sm rounded-lg'>
                                        create bet
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }


    return (
        <main
            style={{ backgroundImage: `url(/assets/boxe-background-1.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
            className='flex min-h-screen flex-col text-sm px-4 bg-black'>
            <div className='font-bold bg-[var(--primary-purple)] p-2 w-full rounded-lg mt-6'>
                <h2 className='text-[13px] text-center font-semibold text-gray-300'>
                    Upcoming Matches Events
                </h2>
            </div>
            <div className='flex-grow overflow-y-auto mt-4 mb-20'>
                <MatchesSchedule />
            </div>
        </main>
    )
}