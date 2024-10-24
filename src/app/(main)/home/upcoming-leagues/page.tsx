"use client"
import React, { useState } from 'react';
import useLeague from '@/app/hooks/use-League';
import { league } from '@/entity/league';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;

const FootballSchedule = () => {
  const leagues = useLeague();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeagues = leagues?.filter((league: league) =>
    league.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil((filteredLeagues?.length ?? 0) / ITEMS_PER_PAGE);

  const paginatedLeagues = filteredLeagues?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) ?? [];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Função para limitar a exibição de 3 botões de página
  const getPageNumbers = () => {
    const maxPages = 3;
    const half = Math.floor(maxPages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxPages - 1, totalPages);

    if (end - start < maxPages - 1) {
      start = Math.max(end - maxPages + 1, 1);
    }

    return [...Array(end - start + 1)].map((_, idx) => start + idx);
  };

  return (
    <div className='flex flex-col gap-2 w-full text-white'>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search leagues by name...'
        className='mb-4 p-2 text-black rounded-lg'
      />

      {paginatedLeagues.flatMap((league: league) => (
        <Link href={`/home/upcoming-matches?leagueId=${league.id}`} key={league.id}>
          <div className='border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full'>
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

      <div className='flex justify-center mt-4'>
        <button
          className={`px-4 py-2 mx-1 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === pageNumber ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className={`px-4 py-2 mx-1 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function UpcomingMatches() {
  return (
    <main
      style={{ backgroundImage: `url(/assets/footbal-matches-background.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      className='flex min-h-screen flex-col text-sm px-4 bg-black'
    >
      <div className='font-bold bg-[var(--primary-purple)] p-2 w-full rounded-lg mt-6'>
        <h2 className='text-[13px] text-center font-semibold text-gray-300'>
          Upcoming football matches
        </h2>
      </div>
      <div className='flex-grow overflow-y-auto mt-4 mb-20'>
        <FootballSchedule />
      </div>
    </main>
  );
}
