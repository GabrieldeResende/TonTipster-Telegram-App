"use client"
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useMatches from "@/app/hooks/use-Matches";
import { teams } from "@/entity/match";
import Web3 from "web3";
import { toast } from "react-hot-toast";
import { useAddress } from "@thirdweb-dev/react"
import {
  createBet,
  joinBet,
  getBetsByMatch,
  getDepositFee,
  Choice,
  BetStatus,
  BetDetail,
} from "../../../../Web3Service";
import { ThirdwebProvider } from "thirdweb/react";

interface FormState {
  selectedGame: string;
  prediction: string;
  betAmount: string;
  potentialWinnings: number;
  description: string;
}

const FootballBetContent = () => {
  const [teamsName, setTeamsName] = useState<teams | null>(null);
  const [existingBets, setExistingBets] = useState<BetDetail[]>([]);
  const [depositFee, setDepositFee] = useState<string>("0");

  const address = useAddress();
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
      {/* Content of the component */}
    </main>
  );
};

const FootballBetComponent = () => {
  return (
    <ThirdwebProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-black text-purple-300">
            Loading bet details...
          </div>
        }
      >
        <FootballBetContent />
      </Suspense>
    </ThirdwebProvider>
  );
};

export default FootballBetComponent;