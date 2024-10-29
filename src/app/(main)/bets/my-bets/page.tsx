'use client'
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ThirdwebProvider } from "thirdweb/react"

const myBetsNav = [
  {
    title: "My Open Bets",
    link: "/bets/open-bets"
  },
  {
    title: "Pending Bet Requests",
    link: "/bets/pending-bets"
  },
  {
    title: "Previous Bets",
    link: "/bets/previous-bets"
  },
]


export default function Bet() {
  return (
    <main className="bg-black text-white px-4 h-screen">
      <div className="flex flex-row items-center justify-between font-bold p-2 w-full rounded-lg">
        <h2 className='text-lg font-semibold text-gray-400 mt-4'>My Bets</h2>
        {/* <Link href="/bets/post-bet">
          <button className='bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-2 mt-4 rounded-lg'>
            Post Bet
          </button>
        </Link> */}
      </div>
      <div className='flex-grow overflow-y-auto mt-4 mb-20'>
        {myBetsNav.map((bet, index) => (
          <Link href={bet.link} key={index}>
            <div className='border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full'>
              <div className='flex justify-between items-center'>
                <div className='flex items-left'>
                  <span className='font-bold'>{bet.title}</span>
                </div>
                <div>
                  <button className='bg-black hover:bg-[#422479] text-white font-bold py-1 px-2 text-sm rounded-lg'>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}