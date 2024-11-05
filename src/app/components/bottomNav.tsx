"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { faHome, faMoneyBills, faTabletAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const BottomNav = () => {
  const pathname = usePathname()
  return (
    <nav className='bottom-0 w-full bg-gray-800 text-white flex justify-between py-3 px-3'>
      <Link href='/home' passHref>
        <div
          className={`flex flex-col items-center ${pathname === "/home" ? "text-purple-500" : "text-white"
            }`}
        >
          <FontAwesomeIcon icon={faHome} />
          <p className='text-sm'>Home</p>
        </div>
      </Link>
      {/* <Link href='#' passHref>
        <div
          className={`flex flex-col items-center ${pathname === "/home" ? "text-purple-500" : "text-white"
            }`}
        >
          <FontAwesomeIcon icon={faHome} />
          <p className='text-sm'>NFTs</p>
        </div>
      </Link> */}
      <Link href='/bets/my-bets' passHref>
        <div
          className={`flex flex-col items-center ${pathname === "/bets/my-bets" ? "text-purple-500" : "text-white"
            }`}
        >
          <FontAwesomeIcon icon={faMoneyBills} />
          <p className='text-sm'>My Bets</p>
        </div>
      </Link>
      <Link href='/home/leaderboard' passHref>
        <div
          className={`flex flex-col items-center ${pathname === "/home/leaderboard" ? "text-purple-500" : "text-white"
            }`}
        >
          <FontAwesomeIcon icon={faTabletAlt} />
          <p className='text-sm'>LeaderBoard</p>
        </div>
      </Link>
    </nav>
  )
}

export default BottomNav
