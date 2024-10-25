"use client"
import { useEffect, useState } from "react";
import { getBetsByAddress, getBet } from "../../../../Web3Service";
import { useAddress } from "@thirdweb-dev/react";
import { BetDetail, BetStatus } from "../../../../Web3Service";
import Web3 from "web3";

export default function OpenBetsList() {
  const [openBets, setOpenBets] = useState<BetDetail[]>([]);
  const address = ""; // Obtém o endereço da carteira conectada

  // Função para carregar apenas apostas em aberto
  const loadOpenBetsByAddress = async () => {
    if (!address) return;

    try {
      const betsArray: BetDetail[] = [];
      let index = 0;
      let betId;

      // Itera sobre os índices e recupera detalhes das apostas
      while (true) {
        try {
          betId = await getBetsByAddress(address, index);
          const bet = await getBet(betId); // Detalhes da aposta

          // Filtra apenas apostas com status PENDING (em aberto)
          if (bet.status === BetStatus.PENDING) {
            betsArray.push(bet);
          }
          index++;
        } catch (error) {
          // Encerra o loop quando não houver mais apostas
          console.error(`Error fetching bet at index ${index}:`, error);
          break;
        }
      }

      setOpenBets(betsArray);
    } catch (error) {
      console.error("Error loading open bets:", error);
    }
  };

  // Carrega as apostas ao montar o componente e quando o endereço mudar
  useEffect(() => {
    loadOpenBetsByAddress();
  }, [address]);

  return (
    <div className="bg-black text-white p-4 h-screen">
      <h2 className="text-[13px] text-center font-semibold text-gray-300 mb-4">
        Open Bets
      </h2>
      {openBets.length > 0 ? (
        <div className="overflow-y-auto">
          {openBets.map((bet) => (
            <div
              key={bet.betId}
              className="border border-gray-800 bg-[#1F2937] rounded-lg p-4 mb-2"
            >
              <p className="font-bold">{`Game: ${bet.player1} vs. ${bet.player2}`}</p>
              <p>{`Stake: ${Web3.utils.fromWei(bet.totalAmount, "ether")} ETH`}</p>
              <p className="text-yellow-400">{`Status: Open`}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No open bets found for this address.</p>
      )}
    </div>
  );
}
