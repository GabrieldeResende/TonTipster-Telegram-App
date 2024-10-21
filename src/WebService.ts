import Web3, { Contract } from "web3";
import ABI from './abi.json'

// Definindo um tipo para as opções do jogo
type GameOption = 0 | 1; // Assumindo que há duas opções no jogo

function getWeb3(): Web3 {
    if (!window.ethereum) throw new Error("No MetaMask found")
    return new Web3(window.ethereum)
}

function getContract(web3?: Web3): Contract<typeof ABI> {
    if (!web3) web3 = getWeb3()
    return new web3.eth.Contract(ABI, `${process.env.REACT_APP_CONTRACT_ADDRESS}`)
}

export async function placeBet(choice: GameOption): Promise<any> {
    const contract = getContract()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return contract.methods.placeBet(choice).send({ from: accounts[0], value: Web3.utils.toWei('0.1', 'ether') })
}

export async function cancelBet(betId: number): Promise<any> {
    const contract = getContract()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return contract.methods.cancelBet(betId).send({ from: accounts[0] })
}

export async function confirmBet(betId: number): Promise<any> {
    const contract = getContract()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return contract.methods.confirmBet(betId).send({ from: accounts[0] })
}

export async function finishGame(): Promise<any> {
    const contract = getContract()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return contract.methods.finishGame().send({ from: accounts[0] })
}

export async function getGameResult(): Promise<GameOption> {
    const contract = getContract()
    return contract.methods.getGameResult().call()
}

export async function getOpenBets(choice: GameOption): Promise<number[]> {
    const contract = getContract()
    return contract.methods.getOpenBets(choice).call()
}

export async function getOpenBetsAndTotal(user: string): Promise<[number[], string]> {
    const contract = getContract()
    return contract.methods.getOpenBetsAndTotal(user).call()
}

export async function getOwner(): Promise<string> {
    const contract = getContract()
    return contract.methods.getOwner().call()
}

export async function matchBet(betIdToMatch: number): Promise<any> {
    const contract = getContract()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return contract.methods.matchBet(betIdToMatch).send({ from: accounts[0], value: Web3.utils.toWei('0.1', 'ether') })
}

export async function setGameResult(result: GameOption): Promise<any> {
    const contract = getContract()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return contract.methods.setGameResult(result).send({ from: accounts[0] })
}

// Funções para acessar os arrays públicos
export async function getBet(betId: number): Promise<any> {
    const contract = getContract()
    return contract.methods.bets(betId).call()
}

export async function getFirstChoiceBetId(index: number): Promise<number> {
    const contract = getContract()
    return contract.methods.firstChoiceBetIds(index).call()
}

export async function getSecondChoiceBetId(index: number): Promise<number> {
    const contract = getContract()
    return contract.methods.secondChoiceBetIds(index).call()
}

export async function getUserBet(user: string, index: number): Promise<number> {
    const contract = getContract()
    return contract.methods.userBets(user, index).call()
}