"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useMatches from "@/app/hooks/use-Matches";
import { teams } from "@/entity/match";
import Web3 from "web3";
import { toast } from "react-hot-toast";
import {
  createBet,
  getBetsByMatch,
  getDepositFee,
  Choice,
  BetStatus,
  BetDetail
} from "../../../../Web3Service";

interface FormState {
  selectedGame: string;
  prediction: string;
  betAmount: string;
  potentialWinnings: number;
  description: string;
  idfixture: number;
}

const FootballBetComponent = () => {
  const [teamsName, setTeamsName] = useState<teams | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [account, setAccount] = useState<string>("");
  const [existingBets, setExistingBets] = useState<BetDetail[]>([]);
  const [depositFee, setDepositFee] = useState<string>("0");

  const searchParams = useSearchParams();
  const fixtureId = parseInt(searchParams.get("fixtureId") ?? "0");

  const match = useMatches({ leagueId: 0, fixtureId: fixtureId });

  const [formState, setFormState] = useState<FormState>({
    selectedGame: "",
    prediction: "",
    betAmount: "",
    potentialWinnings: 0,
    description: "",
    idfixture: fixtureId,
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

  const connectWallet = async () => {
    setConnecting(true);
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        toast.success("Wallet connected successfully!");
      } else {
        toast.error("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    }
    setConnecting(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!account) {
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
      loadExistingBets(); // Reload bets after creation
    } catch (error) {
      console.error("Error creating bet:", error);
      toast.error("Failed to create bet");
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
      <div className="w-full max-w-md border-purple-400 border rounded-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-purple-400 font-bold">Create your bet</h1>
          <button
            onClick={connectWallet}
            disabled={connecting}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            {connecting ? "Connecting..." : account ? "Connected" : "Connect Wallet"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div className="space-y-2">
            <label htmlFor="prediction" className="block text-sm font-medium">
              Select Team
            </label>
            <select
              id="prediction"
              value={formState.prediction}
              onChange={(e) => handleInputChange("prediction", e.target.value)}
              className="w-full p-2 outline-none border-purple-400 border rounded-md bg-black text-white"
            >
              <option value="" disabled>
                Select a team
              </option>
              <option value={teamsName?.home?.id}>{teamsName?.home?.name}</option>
              <option value={teamsName?.away?.id}>{teamsName?.away?.name}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="bet-amount" className="block text-sm font-medium">
              Bet Amount (ETH)
            </label>
            <div className="relative">
              <input
                id="bet-amount"
                type="number"
                step="0.01"
                value={formState.betAmount}
                onChange={(e) => handleInputChange("betAmount", e.target.value)}
                className="w-full outline-none p-2 border-purple-400 border rounded-md bg-black text-white"
                placeholder="Enter bet amount"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Bet Description (optional)
            </label>
            <input
              id="description"
              type="text"
              value={formState.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full outline-none p-2 border-purple-400 border rounded-md bg-black text-white"
              placeholder="Enter bet description"
            />
          </div>

          <div className="space-y-2 py-2">
            <p className="text-sm">
              Deposit Fee: {Web3.utils.fromWei(depositFee, "ether")} ETH
            </p>
          </div>

          <button
            type="submit"
            disabled={!account || !formState.prediction || !formState.betAmount}
            className="bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-2 rounded-lg w-full disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Place Bet
          </button>
        </form>

        {existingBets.length > 0 && (
          <div className="mt-6">
            <h2 className="text-purple-400 font-bold mb-4">Existing Bets</h2>
            <div className="space-y-2">
              {existingBets.map((bet, index) => (
                <div key={index} className="border border-purple-400 rounded-md p-3">
                  <p>Bet ID: {bet.betId}</p>
                  <p>Amount: {Web3.utils.fromWei(bet.totalAmount, "ether")} ETH</p>
                  <p>Status: {BetStatus[bet.status]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default FootballBetComponent;
