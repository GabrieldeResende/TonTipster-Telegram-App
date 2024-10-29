"use client"
import React from 'react';
import Link from "next/link";

export default function Matches() {

  return (
    <main className='flex min-h-screen flex-col text-sm items-start p-4 bg-black'>
      <div className='w-full h-full'>
        <div className='text-white bg-[var(--primary-purple)] mt-1 p-4'>
          <h1 className='text-[12px]'>@OneMilliCrypto - WON - 150,000 Tipster Token</h1>
        </div>
        <div
          style={{ backgroundImage: `url(/assets/newCastle-Arsenal.jfif)` }}
          className='w-full bg-cover bg-center rounded-lg p-4 my-8'
        >
          <div className='h-52 flex flex-col justify-between'>
            <div className='flex flex-row justify-between items-center'>
              <h3 className='text-white'>Sat at 09:30pm</h3>
              <Link href="/bets/open-bets">
                <button className='bg-[var(--primary-purple)] hover:bg-[var(--primary-purple)] text-white font-bold py-2 px-8 rounded-lg'>
                  PLACE BET
                </button>
              </Link>
            </div>
            <div>
              <div className='flex mb-1'>
                <img className='mr-2 max-w-5' src=".\assets\newCastle.png" alt="" />
                <h2 className='text-xl text-white'>New Castle</h2>
              </div>
              <div className='flex mb-1'>
                <img className='mr-2 max-w-5' src=".\assets\arsenal.png" alt="" />
                <h2 className='text-xl text-white'>Arsenal</h2>
              </div>
            </div>
            <div className='text-white text-right'>
              <h1>Comming Soon</h1>
            </div>
          </div>
        </div>
        <Link href="/home/upcoming-ufc-events">
          <div
            style={{ backgroundImage: `url(/assets/boxing-background.png)` }}
            className='w-full bg-cover bg-center rounded-lg p-6 my-4'
          >
            <div className='flex flex-col justify-between'>
              <div>
                <h2 className='text-[36px] text-white'>UFC</h2>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/home/upcoming-boxe">
          <div
            style={{ backgroundImage: `url(/assets/UFC-background.png)` }}
            className='w-full bg-cover bg-center rounded-lg p-6 my-4'
          >
            <div className='flex flex-col justify-between'>
              <div>
                <h2 className='text-[36px] text-white'>Boxing</h2>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/home/upcoming-leagues">
          <div
            style={{ backgroundImage: `url(/assets/football-background.png)` }}
            className='w-full bg-cover bg-center rounded-lg p-6 my-4'
          >
            <div className='flex flex-col justify-between'>
              <div>
                <h2 className='text-[36px] text-white'>Football</h2>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  )
}
