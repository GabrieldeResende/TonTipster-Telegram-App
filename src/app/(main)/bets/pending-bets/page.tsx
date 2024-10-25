"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { confirmBet, cancelBet, getBetsByAddress, getBet } from "../../../../Web3Service";
// import { useAddress } from "@thirdweb-dev/react";
import { BetDetail, BetStatus } from "../../../../Web3Service";
import Web3 from "web3";

export default function PendingBets() {
  const [pendingBets, setPendingBets] = useState<BetDetail[]>([]);
  // const address = useAddress(); 
  const address = ""; 

  const loadPendingBets = async () => {
    if (!address) return;

    try {
      const betsArray: BetDetail[] = [];
      let index = 0;
      let betId;

      while (true) {
        try {
          betId = await getBetsByAddress(address, index);
          const bet = await getBet(betId);

          if (bet.status === BetStatus.PENDING) {
            betsArray.push(bet);
          }
          index++;
        } catch (error) {
          console.error(`Error fetching bet at index ${index}:`, error);
          break;
        }
      }

      setPendingBets(betsArray);
    } catch (error) {
      console.error("Error loading pending bets:", error);
    }
  };

  useEffect(() => {
    loadPendingBets();
  }, [address]);

  const handleConfirmBet = async (betId: number) => {
    try {
      await confirmBet(betId);
      alert("Bet confirmed successfully!");
      loadPendingBets();
    } catch (error) {
      console.error("Error confirming bet:", error);
      alert("Failed to confirm the bet.");
    }
  };

  const handleCancelBet = async (betId: number) => {
    try {
      await cancelBet(betId);
      alert("Bet cancelled successfully!");
      loadPendingBets();
    } catch (error) {
      console.error("Error cancelling bet:", error);
      alert("Failed to cancel the bet.");
    }
  };

  return (
    <main
      style={{ backgroundImage: `url(/assets/pendingBet-background.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      className="bg-black text-white p-4 h-screen"
    >
      <div className="font-bold bg-[var(--primary-purple)] p-2 rounded-lg">
        <h2 className="text-[13px] text-center font-semibold text-gray-300">Pending Bet Requests</h2>
      </div>
      <div className="bg-black p-1 flex-grow overflow-y-auto mt-4 mb-20">
        {pendingBets.length > 0 ? (
          pendingBets.map((bet) => (
            <div key={bet.betId} className="border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full">
              <div className="flex items-center justify-between text-sm text-[#D5B3FB] mb-2">
                <p>{bet.player1}</p>
                <p>{bet.player2}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">{`Game: ${bet.player1} vs. ${bet.player2}`}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-[#7F8793]">{`Stake: ${Web3.utils.fromWei(bet.totalAmount, "ether")} ETH`}</p>
                <p className="text-[#7F8793]">{`Status: Pending`}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[#EAB30A] text-xs">{`Expires in: 3h 15min`}</p>
                <div className="flex items-center text-2xl">
                  <button onClick={() => handleConfirmBet(bet.betId)}>
                    <FontAwesomeIcon color="#4AD77E" icon={faCheckCircle} className="mr-2 cursor-pointer" />
                  </button>
                  <button onClick={() => handleCancelBet(bet.betId)}>
                    <FontAwesomeIcon color="red" icon={faTimesCircle} className="cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No pending bets found.</p>
        )}
      </div>
    </main>
  );
}