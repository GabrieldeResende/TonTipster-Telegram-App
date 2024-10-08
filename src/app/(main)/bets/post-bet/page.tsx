"use client"
import React, { useState } from "react"

const footballGames = [
  {
    id: "2ad488c4-25f0-4e74-9955-e169789f0a6b",
    fixtureId: 1205405,
    fixtureDate: "2024-09-04T22:00:00.000Z",
    venueName: "Estadio Metropolitano de Techo",
    venueCity: "Bogotá, D.C.",
    statusLong: "Second Half",
    statusElapsed: 90,
    leagueDetails: {
      id: 920,
      logo: "https://media.api-sports.io/football/leagues/920.png",
      name: "World Cup - U20 - Women",
      season: 2024,
    },
    teamsDetails: {
      away: {
        id: 19090,
        logo: "https://media.api-sports.io/football/teams/19090.png",
        name: "Nigeria U20 W",
      },
      home: {
        id: 19084,
        logo: "https://media.api-sports.io/football/teams/19084.png",
        name: "Germany U20 W",
      },
    },
    scoreDetails: {
      fulltime: {
        away: null,
        home: null,
      },
      halftime: {
        away: 0,
        home: 1,
      },
    },
    createdAt: "2024-09-04T23:17:10.909Z",
    updatedAt: "2024-09-04T23:56:47.937Z",
  },
  {
    id: "2ad488c4-25f0-4e74-9955-e169789f0a6s",
    fixtureId: 1205405,
    fixtureDate: "2024-09-04T22:00:00.000Z",
    venueName: "Estadio Metropolitano de Techo",
    venueCity: "Bogotá, D.C.",
    statusLong: "Second Half",
    statusElapsed: 90,
    leagueDetails: {
      id: 920,
      logo: "https://media.api-sports.io/football/leagues/920.png",
      name: "World Cup - U20 - Women",
      season: 2024,
    },
    teamsDetails: {
      away: {
        id: 19090,
        logo: "https://media.api-sports.io/football/teams/19090.png",
        name: "Nigeria U20 W",
      },
      home: {
        id: 19084,
        logo: "https://media.api-sports.io/football/teams/19084.png",
        name: "Germany U20 W",
      },
    },
    scoreDetails: {
      fulltime: {
        away: null,
        home: null,
      },
      halftime: {
        away: 0,
        home: 1,
      },
    },
    createdAt: "2024-09-04T23:17:10.909Z",
    updatedAt: "2024-09-04T23:56:47.937Z",
  },
]

const getPossiblePredictions = (homeTeam: string, awayTeam: string) => {
  if (!homeTeam || !awayTeam) return []
  const predictionOptions = [
    { label: `${homeTeam} wins`, value: `homeWins` },
    { label: `${awayTeam} wins`, value: `awayWins` },
    { label: "Draw", value: `draw` },
    { label: "No Draw", value: `noDraw` }
  ]

  return predictionOptions
}

interface FormState {
  selectedGame: string
  odds: string
  prediction: string
  betAmount: string
  potentialWinnings: number
  description: string
  expiryDate: string
}

const FootballBetComponent = () => {
  const [formState, setFormState] = useState<FormState>({
    selectedGame: "",
    odds: "",
    prediction: "",
    betAmount: "",
    potentialWinnings: 0,
    description: "",
    expiryDate: "",
  })
  const [selectedTeamDetails, setSelectedTeamDetails] = useState<any>({
    home: null,
    away: null,
  })

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormState((prevState) => {
      const updatedState = { ...prevState, [field]: value }

      // Calculate potential winnings when relevant fields change
      if (field === "odds" || field === "betAmount") {
        const newOdds = field === "odds" ? value : updatedState.odds
        const newBetAmount =
          field === "betAmount" ? value : updatedState.betAmount
        updatedState.potentialWinnings = calculatePotentialWinnings(
          newOdds,
          newBetAmount
        )
      }
      if (field === "selectedGame") {
        const teamDetails = footballGames.find(
          (game) => game.id === value
        )?.teamsDetails
        if (teamDetails) {
          setSelectedTeamDetails({
            home: teamDetails.home.name,
            away: teamDetails.away.name,
          })
        }
      }

      return updatedState
    })
  }

  const calculatePotentialWinnings = (
    currentOdds: string,
    currentBetAmount: string
  ) => {
    const oddsValue = parseFloat(currentOdds)
    const betValue = parseFloat(currentBetAmount)

    if (!isNaN(oddsValue) && !isNaN(betValue)) {
      const winnings =
        oddsValue > 0
          ? betValue * (oddsValue / 100)
          : betValue / (Math.abs(oddsValue) / 100)
      return Number(winnings.toFixed(2))
    } else {
      return 0
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <main className='bg-black text-purple-300 flex items-center justify-center px-4 py-6 h-full'>
      <div className='w-full max-w-md border-purple-400 border rounded-lg p-6'>
        <h1 className='text-purple-400 font-bold mb-8'>
          Create your football bet
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4 mb-4'>
          <div className='space-y-2'>
            <label htmlFor='game-select' className='block text-sm font-medium'>
              Select Game
            </label>
            <select
              id='game-select'
              value={formState.selectedGame}
              onChange={(e) =>
                handleInputChange("selectedGame", e.target.value)
              }
              className='w-full p-2 outline-none border-purple-400 border rounded-md bg-black text-white'
            >
              <option value='' disabled>
                Select a game
              </option>
              {footballGames.map((game) => (
                <option key={game.id} value={game.id}>
                  {`${game.teamsDetails.home.name} vs ${game.teamsDetails.away.name}`}
                </option>
              ))}
            </select>
          </div>
          <div className='space-y-2'>
            <label htmlFor='game-select' className='block text-sm font-medium'>
              Select Prediction
            </label>
            <select
              id='game-select'
              value={formState.prediction}
              onChange={(e) => handleInputChange("prediction", e.target.value)}
              className='w-full p-2 outline-none border-purple-400 border rounded-md bg-black text-white'
            >
              <option value='' disabled>
                Select a prediction
              </option>
              {getPossiblePredictions(
                selectedTeamDetails.home,
                selectedTeamDetails.away
              ).map((prediction, index) => (
                <option key={index} value={prediction.value}>
                  {prediction.label}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-2'>
            <label htmlFor='bet-amount' className='block text-sm font-medium'>
              Bet Amount ($)
            </label>
            <div className='relative'>
              <input
                id='bet-amount'
                type='number'
                value={formState.betAmount}
                onChange={(e: any) =>
                  handleInputChange("betAmount", e.target.value)
                }
                className='w-full outline-none p-2 border-purple-400 border rounded-md bg-black text-white'
                placeholder='Enter bet amount'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label htmlFor='odds' className='block text-sm font-medium'>
              Odds
            </label>
            <div className='relative'>
              <input
                id='odds'
                type='number'
                value={formState.odds}
                onChange={(e: any) => handleInputChange("odds", e.target.value)}
                className='w-1/2 outline-none p-2 border-purple-400 border rounded-md bg-black text-white'
                placeholder='Enter odds'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <label htmlFor='description' className='block text-sm font-medium'>
              Bet Description(optional)
            </label>
            <div className='relative'>
              <input
                id='description'
                type='text'
                value={formState.description}
                onChange={(e: any) =>
                  handleInputChange("description", e.target.value)
                }
                className='w-full outline-none p-2 border-purple-400 border rounded-md bg-black text-white'
                placeholder='Enter bet description'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <label htmlFor='expiry-date' className='block text-sm font-medium'>
              Expiry Date
            </label>
            <div className='relative'>
              <input
                id='date'
                type='date'
                value={formState.expiryDate}
                style={{ colorScheme: "dark" }}
                onChange={(e: any) =>
                  handleInputChange("expiryDate", e.target.value)
                }
                className='w-full outline-none p-2 border-purple-400 border rounded-md bg-black text-white'
                placeholder='Bet expiry date'
              />
            </div>
          </div>

          <div className='space-y-2 py-2'>
            <p className='block text-sm font-medium'>
              Potential Winnings:
              <span className='text-sm font-semibold'>
                ${formState.potentialWinnings}
              </span>
            </p>
          </div>

          <button className='bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-2 rounded-lg w-full'>
            Post Bet
          </button>
        </form>
        <button className='bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-2 rounded-lg w-full'>
          Cancel
        </button>
      </div>
    </main>
  )
}

export default FootballBetComponent
