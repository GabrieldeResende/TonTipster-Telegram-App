"use client"
import React from 'react';
import Link from "next/link";
import Image from "next/image"

export default function UFCEvents() {

    const UFCFights = [
        {
            fixtureDate: "2024-09-04T22:00:00.000Z",
            weight: "flyweight",
            firstFigther: {
                logo: "https://media.api-sports.io/football/teams/19086.png",
                firstName: "Artur",
                secondName: "Beterbiev",
                country: "Japan",
                rank: "Rank 5"
            },
            secondFighter: {
                logo: "https://media.api-sports.io/football/teams/19080.png",
                firstName: "Dmitrii",
                secondName: "Bivol",
                country: "USA",
                rank: "Rank 1"
            }
        },
        {
            fixtureDate: "2024-09-04T22:00:00.000Z",
            weight: "flyweight",
            firstFigther: {
                logo: "https://media.api-sports.io/football/teams/19086.png",
                firstName: "Fabio",
                secondName: "Wardley",
                country: "Japan",
                rank: "Rank 5"
            },
            secondFighter: {
                logo: "https://media.api-sports.io/football/teams/19080.png",
                firstName: "Ben",
                secondName: "Whittaker",
                country: "USA",
                rank: "Rank 1"
            }
        },
    ]

    const UFCSchedule = () => {
        return (
            <div className='flex flex-col gap-2 w-12/12'>
                {UFCFights.map((figther) => (
                    <Link href={`/bets/open-bets`}>
                        <div className='border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full'>
                            <div className='flex justify-between items-center mb-2'>
                                <div className='flex items-center'>
                                    <div className='flex flex-col justify-center'>
                                        <Image
                                            src={figther.firstFigther.logo}
                                            alt={figther.firstFigther.country}
                                            width={30}
                                            height={30}
                                            className='mr-2'
                                        />
                                        <h1 className='text-[10px] mt-2 text-white'>{figther.firstFigther.rank}</h1>
                                    </div>
                                    <div className='flex flex-col ml-4'>
                                        <span className='text-[10px] text-grey'>{figther.firstFigther.firstName}</span>
                                        <span className='text-[12px] text-white'>{figther.firstFigther.secondName}</span>
                                    </div>
                                </div>
                                <div className='text-white text-center'>
                                    <h1>VS</h1>
                                    {/* <p className='text-[12px] uppercase'>{figther.weight}</p> */}
                                </div>
                                <div className='flex items-center'>
                                    <div className='flex flex-col mr-4 text-end'>
                                        <span className='text-[10px] text-grey'>{figther.secondFighter.firstName}</span>
                                        <span className='text-[12px] text-white'>{figther.secondFighter.secondName}</span>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <Image
                                            src={figther.secondFighter.logo}
                                            alt={figther.secondFighter.country}
                                            width={30}
                                            height={30}
                                            className='mr-2'
                                        />
                                        <h1 className='text-[10px] mt-2 text-white'>{figther.secondFighter.rank}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text-[#D5B3FB] mt-4'>
                                <div>
                                    <p>{figther.fixtureDate}</p>
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
                    Upcoming Boxing Events
                </h2>
            </div>
            <div className='flex-grow overflow-y-auto mt-4 mb-20'>
                <UFCSchedule />
            </div>
        </main>
    )
}