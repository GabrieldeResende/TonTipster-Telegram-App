"use client"
import React from 'react';
import Link from "next/link";
import Image from "next/image"
import useUFC from '@/app/hooks/use-ufc';
import { addDays, withoutTime } from '@/app/utils/time';

export default function UFCEvents() {

    const filterDate = new Date()

    const UFCSchedule = () => {

        const ufc = useUFC()

        return (
            <div className='flex flex-col gap-2 w-12/12'>
                {ufc.filter(fight => withoutTime(filterDate) <= withoutTime(fight?.date) && withoutTime(fight.date) <= addDays(filterDate, 2)).flatMap((figther) => (
                    <Link href={`/bets/open-bets`}>
                        <div className='border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full'>
                            <div className='flex justify-between items-center mb-2'>
                                <div className='flex items-center'>
                                    <div className='flex flex-col justify-center'>
                                        <Image
                                            src={figther?.fighters?.first?.logo}
                                            alt={figther?.fighters?.first?.name}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className='flex flex-col ml-2'>
                                        <span className='text-[12px] text-white'>{figther?.fighters?.first?.name}</span>
                                    </div>
                                </div>
                                <div className='text-grey text-center text-[12px] uppercase'>
                                    <h1>VS</h1>
                                    <p>{figther?.category}</p>
                                </div>
                                <div className='flex items-center'>
                                    <div className='flex flex-col mr-2 text-end'>
                                        <span className='text-[12px] text-white'>{figther?.fighters?.second?.name}</span>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <Image
                                            src={figther?.fighters?.second?.logo}
                                            alt={figther?.fighters?.second?.name}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text-[#D5B3FB] mt-4'>
                                <div>
                                    <p>{new Date(figther?.date).toLocaleDateString('en-us')}</p>
                                </div>
                                <button className='bg-black hover:bg-[#422479] text-white font-bold py-1 px-2 text-sm rounded-lg'>
                                    Create Bet
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }


    return (
        <main
            style={{ backgroundImage: `url(/assets/ufc-background-1.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
            className='flex min-h-screen flex-col text-sm px-4 bg-black'>
            <div className='font-bold bg-[var(--primary-purple)] p-2 w-full rounded-lg mt-6'>
                <h2 className='text-[13px] text-center font-semibold text-gray-300'>
                    Upcoming UFC Events
                </h2>
            </div>
            <div className='flex-grow overflow-y-auto h-auto mt-4 mb-4'>
                <UFCSchedule />
            </div>
        </main>
    )
}