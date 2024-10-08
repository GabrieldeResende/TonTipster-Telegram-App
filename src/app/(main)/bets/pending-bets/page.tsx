'use client'
import Link from "next/link";
import { faCheckCircle, faT, faTimesCircle } from "@fortawesome/free-solid-svg-icons"
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
    participants: [
      {
        name: "@vicHacks",
      },
      {
        name: "@Onemillicrypt",
      }
    ]
  },
  {
    id: 2,
    game: "Packers vs. Bears",
    odds: "1.5",
    amount: "$100",
    potentialWinnings: "$200",
    description: "This is a test bet",
    expiryDate: "2023-05-01",
    participants: [
      {
        name: "@vicHacks",
      },
      {
        name: "@Onemillicrypt",
      }
    ]
  },
  {
    id: 3,
    game: "Cowboys vs. Eagles",
    odds: "1.5",
    amount: "$100",
    potentialWinnings: "$200",
    description: "This is a test bet",
    expiryDate: "2023-05-01",
    participants: [
      {
        name: "@vicHacks",
      },
      {
        name: "@Onemillicrypt",
      }
    ]
  }
]


export default function Bet() {
  return (
    <main
      style={{ backgroundImage: `url(/assets/pendingBet-background.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      className="bg-black text-white p-4 h-screen">
      <div className="font-bold bg-[var(--primary-purple)] p-2 rounded-lg">
        <h2 className='text-[13px] text-center font-semibold text-gray-300'>Pending Bet Requests</h2>
      </div>
      <div className='bg-black p-1 flex-grow overflow-y-auto mt-4 mb-20'>
        {bets.map((bet, index) => (
          <div key={index} className='border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full'>
            <div className="flex items-center justify-between text-sm text-[#D5B3FB] mb-2">
              <p>
                {bet.participants[0].name}
              </p>
              <p>
                {bet.participants[1].name}
              </p>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-left'>
                <span className='font-bold'>{bet.game}</span>
              </div>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <div>
                <p className="text-[#7F8793]">{`Stake: ${bet.amount}`}</p>
              </div>
              <div>
                <p className="text-[#7F8793]">{`Odds: ${bet.odds}`}</p>
              </div>
              <div className="">
                <p className="text-[#4AD77E] ml-1">{`Potential win: ${bet.potentialWinnings}`}</p>
              </div>
            </div>
            <div className='flex items-center justify-between mt-2'>
              <div>
                <p className="text-[#EAB30A] text-xs">{`Expires in: 3h 15min`}</p>
              </div>
              <div className="flex items-center text-2xl">
                <FontAwesomeIcon color="#4AD77E" icon={faCheckCircle} className="mr-1" />
                <FontAwesomeIcon color="red" icon={faTimesCircle} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}