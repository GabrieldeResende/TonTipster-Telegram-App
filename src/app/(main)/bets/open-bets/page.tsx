'use client'
import Link from "next/link";
import { faClockFour, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const bets = [
  {
    id: 1,
    game: "Patriots vs. Bills",
    odds: "1.5",
    amount: "$100",
    potentialWinnings: "$200",
    description: "This is a test bet",
    expiryDate: "2023-05-01",
  },
  {
    id: 2,
    game: "Packers vs. Bears",
    odds: "1.5",
    amount: "$100",
    potentialWinnings: "$200",
    description: "This is a test bet",
    expiryDate: "2023-05-01",
  },
  {
    id: 3,
    game: "Cowboys vs. Eagles",
    odds: "1.5",
    amount: "$100",
    potentialWinnings: "$200",
    description: "This is a test bet",
    expiryDate: "2023-05-01",
  }
]


export default function Bet() {
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams.get('leagueId'));
  return (
    <main
      style={{ backgroundImage: `url(/assets/openBets-background.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      className="bg-black text-white p-4 h-screen">
      <div className="font-bold bg-[var(--primary-purple)] p-2 rounded-lg">
        <h2 className='text-[13px] text-center font-semibold text-gray-300'>Open Bets</h2>
      </div>
      <div className='bg-black p-1 flex-grow overflow-y-auto mt-4 mb-20'>
        {bets.map((bet, index) => (
          <div key={index} className='border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full'>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-left'>
                <span className='font-bold'>{bet.game}</span>
              </div>
              <button className='bg-black hover:bg-[#422479] text-white font-bold py-1 px-2 text-sm rounded-lg'>
                Place Bet
              </button>
            </div>
            <div className='flex items-center justify-between text-[#D5B3FB] mb-1'>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClockFour} />
                <p className="ml-1">{bet.expiryDate}</p>
              </div>
              <div>
                <p>{`Odds: ${bet.odds}`}</p>
              </div>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <div>
                <p className="text-[#7F8793]">{`Stake: ${bet.amount}`}</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon color="#4AD77E" icon={faArrowCircleRight} />
                <p className="text-[#4AD77E] ml-1">{`Potential win: ${bet.potentialWinnings}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}