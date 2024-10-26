"use client"
import React, { useEffect, useState, Suspense } from 'react';
import Link from "next/link";
import Image from "next/image";
import useMatches from '@/app/hooks/use-Matches';
import { match } from '@/entity/match';
import { useSearchParams } from 'next/navigation';

const ITEMS_PER_PAGE = 10;

// Componente que usa useSearchParams
const MatchesScheduleContent = () => {
    const searchParams = useSearchParams();
    const leagueId = parseInt(searchParams.get('leagueId') ?? '0');
    
    const matches = useMatches({ leagueId: leagueId, fixtureId: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [matchesGames, setMatchesGames] = useState<match[] | null>(null)

    useEffect(() => {
        if(leagueId === 0) return;
        setMatchesGames(matches)
    }, [matches])

    // Calculate total pages based on filtered matches
    const filteredMatches = matchesGames?.filter((match: match) =>
        match.teams.home.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.teams.away.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil((filteredMatches?.length ?? 0) / ITEMS_PER_PAGE);

    // Get the matches for the current page
    const paginatedMatches = filteredMatches?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Handle page navigation
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='flex flex-col gap-2 w-12/12'>
            {/* Search Input */}
            <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search by team name...'
                className='mb-4 p-2 text-black rounded-lg'
            />

            {((paginatedMatches ?? [])).flatMap((match: match) => (
                <Link href={`/bets/post-bet?fixtureId=${match?.fixture?.id}`} key={match.fixture.id}>
                    <div className='border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full'>
                        <div className='flex justify-between items-center mb-2'>
                            <div className='flex items-center'>
                                <div className='flex flex-col justify-center'>
                                    <Image
                                        src={match?.teams?.home?.logo}
                                        alt={match?.teams?.home?.name}
                                        width={30}
                                        height={30}
                                        className='mr-2'
                                    />
                                </div>
                                <div className='flex flex-col ml-1'>
                                    <span className='text-[12px] text-white'>{match?.teams?.home?.name}</span>
                                    <h1 className='text-white'>{match?.score?.fulltime?.home}</h1>
                                </div>
                            </div>
                            <div>
                                <h1>VS</h1>
                            </div>
                            <div className='flex items-center'>
                                <div className='flex flex-col mr-4 text-end'>
                                    <span className='text-[12px] text-white'>{match?.teams?.away?.name}</span>
                                    <h1 className='text-white'>{match?.score?.fulltime?.away}</h1>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <Image
                                        src={match?.teams?.away?.logo}
                                        alt={match?.teams?.away?.name}
                                        width={30}
                                        height={30}
                                        className='mr-2'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between text-[#D5B3FB] mt-4'>
                            <div>
                                <p>{new Date(match?.fixture?.date).toLocaleDateString('en-us')}</p>
                            </div>
                            <Link href={`/bets/post-bet?fixtureId=${match?.fixture?.id}`}>
                                <button className='bg-black hover:bg-[#422479] text-white font-bold py-1 px-2 text-sm rounded-lg'>
                                    Create Bet
                                </button>
                            </Link>
                        </div>
                    </div>
                </Link>
            ))}

            {/* Pagination Controls */}
            <div className='flex justify-between items-center mt-4'>
                <button
                    className='bg-black hover:bg-[#422479] text-white font-bold py-1 px-2 text-sm rounded-lg'
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                >
                    Previous
                </button>
                <span className='text-white'>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className='bg-black hover:bg-[#422479] text-white font-bold py-1 px-2 text-sm rounded-lg'
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

// Componente wrapper com Suspense
const MatchesSchedule = () => {
    return (
        <Suspense fallback={<div className="text-white">Loading matches...</div>}>
            <MatchesScheduleContent />
        </Suspense>
    );
};

export default function MatchesEvents() {
    return (
        <main
            style={{ backgroundImage: `url(/assets/footbal-matches-background.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
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
    );
}