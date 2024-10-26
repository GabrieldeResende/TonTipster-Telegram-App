"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useMatches from "@/app/hooks/use-Matches";
import { teams } from "@/entity/match";
import Web3 from "web3";
import { toast } from "react-hot-toast";
import {
  createBet,
  joinBet,
  getBetsByMatch,
  getDepositFee,
  Choice,
  BetStatus,
  BetDetail,
} from "../../../../Web3Service";

interface FormState {
  selectedGame: string;
  prediction: string;
  betAmount: string;
  potentialWinnings: number;
  description: string;
}

// Componente que contém a lógica principal
const FootballBetContent = () => {
  const [teamsName, setTeamsName] = useState<teams | null>(null);
  const [existingBets, setExistingBets] = useState<BetDetail[]>([]);
  const [depositFee, setDepositFee] = useState<string>("0");

  const address = "";
  const searchParams = useSearchParams();
  const fixtureId = parseInt(searchParams.get("fixtureId") ?? "0");
  const match = useMatches({ leagueId: 0, fixtureId });

  const [formState, setFormState] = useState<FormState>({
    selectedGame: "",
    prediction: "",
    betAmount: "",
    potentialWinnings: 0,
    description: "",
  });

  useEffect(() => {
    setTeamsName(match[0]?.teams || null);
    loadExistingBets();
    loadDepositFee();
  }, [match]);

  const loadExistingBets = async () => {
    try {
      const bets = await getBetsByMatch(fixtureId);
      setExistingBets(bets);
    } catch (error) {
      console.error("Error loading bets:", error);
    }
  };

  const loadDepositFee = async () => {
    try {
      const fee = await getDepositFee();
      setDepositFee(fee);
    } catch (error) {
      console.error("Error loading deposit fee:", error);
    }
  };

  const handleCreateBet = async () => {
    if (!address) {
      toast.error("Please connect your wallet first!");
      return;
    }

    try {
      const choice =
        formState.prediction === teamsName?.home?.id.toString()
          ? Choice.CHOICE_1
          : Choice.CHOICE_2;
      const betAmount = Web3.utils.toWei(formState.betAmount, "ether");

      await createBet(fixtureId, choice);
      toast.success("Bet created successfully!");
      loadExistingBets();
    } catch (error) {
      console.error("Error creating bet:", error);
      toast.error("Failed to create bet");
    }
  };

  const handleJoinBet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address) {
      toast.error("Please connect your wallet first!");
      return;
    }

    try {
      const choice =
        formState.prediction === teamsName?.home?.id.toString()
          ? Choice.CHOICE_1
          : Choice.CHOICE_2;
      await joinBet(parseInt(formState.selectedGame), choice);
      toast.success("Successfully joined the bet!");
      loadExistingBets();
    } catch (error) {
      console.error("Error joining bet:", error);
      toast.error("Failed to join bet");
    }
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <main className="bg-black text-purple-300 flex items-center justify-center px-4 py-6 h-full">
      <div className="w-full h-full max-w-md border-purple-400 border rounded-lg p-6">
        <div className="space-y-2 mb-4">
          <h2 className="text-purple-400 font-bold">Bets for this Match</h2>
          {existingBets.length > 0 ? (
            <select
              value={formState.selectedGame}
              onChange={(e) => handleInputChange("selectedGame", e.target.value)}
              className="w-full p-2 outline-none border-purple-400 border rounded-md bg-black text-white"
            >
              <option value="" disabled>Select a bet</option>
              {existingBets.map((bet) => (
                <option key={bet.betId} value={bet.betId}>
                  Bet ID: {bet.betId} - {Web3.utils.fromWei(bet.totalAmount, "ether")} ETH
                </option>
              ))}
            </select>
          ) : (
            <p className="text-sm text-gray-400">No bets available for this match.</p>
          )}
        </div>

        <form onSubmit={handleJoinBet} className="space-y-4 mb-4">
          <div className="space-y-2">
            <label htmlFor="prediction" className="block text-sm font-medium">
              Prediction
            </label>
            <select
              id="prediction"
              value={formState.prediction}
              onChange={(e) => handleInputChange("prediction", e.target.value)}
              className="w-full p-2 outline-none border-purple-400 border rounded-md bg-black text-white"
            >
              <option value="" disabled>Select Team</option>
              <option value={teamsName?.home?.id}>{teamsName?.home?.name}</option>
              <option value={teamsName?.away?.id}>{teamsName?.away?.name}</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!address || !formState.selectedGame}
            className="bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-2 rounded-lg w-full disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Join Bet
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-purple-400 font-bold">Create a New Bet</h2>
          <input
            type="number"
            step="0.01"
            placeholder="Bet Amount (ETH)"
            value={formState.betAmount}
            onChange={(e) => handleInputChange("betAmount", e.target.value)}
            className="w-full p-2 border-purple-400 border rounded-md bg-black text-white"
          />
          <button
            onClick={handleCreateBet}
            disabled={!address || !formState.betAmount || !formState.prediction}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold p-2 rounded-lg w-full"
          >
            Create Bet
          </button>
        </div>
      </div>
    </main>
  );
};

// Componente wrapper com Suspense
const FootballBetComponent = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-black text-purple-300">
          Loading bet details...
        </div>
      }
    >
      <FootballBetContent />
    </Suspense>
  );
};

export default FootballBetComponent;