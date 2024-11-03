"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
// import { useAddress } from "@thirdweb-dev/react";
import { getBetsByAddress, getBet } from "../../../../Web3Service";
import { BetDetail, BetStatus } from "../../../../Web3Service";
import Web3 from "web3";

export default function PreviousBets() {
  const [closedBets, setClosedBets] = useState<BetDetail[]>([]);
  // const address = useAddress(); 
  const address = "";

  const loadClosedBets = async () => {
    if (!address) return;

    try {
      const betsArray: BetDetail[] = [];
      let index = 0;
      let betId;

      while (true) {
        try {
          betId = await getBetsByAddress(address, index);
          const bet = await getBet(betId);
          if (
            bet.status === BetStatus.FINALIZED ||
            bet.status === BetStatus.CANCELLED
          ) {
            betsArray.push(bet);
          }
          index++;
        } catch (error) {
          console.error(`Error fetching bet at index ${index}:`, error);
          break;
        }
      }

      setClosedBets(betsArray);
    } catch (error) {
      console.error("Error loading closed bets:", error);
    }
  };

  // Carrega as apostas quando o componente monta ou o endereço muda
  useEffect(() => {
    loadClosedBets();
  }, [address]);

  return (
    <main
      style={{
        backgroundImage: `url(/assets/openBets-background.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="bg-black text-white p-4 h-screen"
    >
      <div className="font-bold bg-[var(--primary-purple)] p-2 rounded-lg">
        <h2 className="text-[13px] text-center font-semibold text-gray-300">
          Previous Bets
        </h2>
      </div>
      <div className="bg-black p-1 flex-grow overflow-y-auto mt-4 mb-20">
        {closedBets.length > 0 ? (
          closedBets.map((bet) => (
            <div
              key={bet.betId}
              className="border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2 w-full"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">{`Game: ${bet.player1} vs. ${bet.player2}`}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <FontAwesomeIcon color="#4AD77E" icon={faArrowCircleUp} />
                  <p className="text-[#4AD77E] ml-1">
                    {bet.status === BetStatus.FINALIZED ? "Finalized" : "Cancelled"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-[#4AD77E] ml-1">
                    {`+${Web3.utils.fromWei(bet.totalAmount, "ether")} ETH`}
                  </p>
                </div>
              </div>
              <div className="text-sm text-[#D5B3FB] mt-2">
                <p>{`Won against: ${bet.player2 || "N/A"}`}</p>
              </div>
            </div>
          ))
        ) : (
          // <div className="bg-purple-700 p-3">
          //   <div className="flex justify-between w-full">
          //     <h1 className="mb-2">Chelsea</h1>
          //     <p className="text-black">vs</p>
          //     <h1 className="mb-2">Newcastle</h1>
          //   </div>
          //   <div className="flex justify-between w-full">
          //     <p className="text-green-500">Win</p>
          //     <p>$ 550.00</p>
          //   </div>
          // </div>
          <p className="text-gray-400 text-center">No Previous Bets.</p>
        )}
      </div>
    </main>
  );
}
