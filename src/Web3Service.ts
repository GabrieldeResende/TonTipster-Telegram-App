import Web3, { Contract } from "web3";
import ABI from './abi.json'

export enum Choice {
    CHOICE_1,
    CHOICE_2
}

export enum BetStatus {
    PENDING,
    CONFIRMED,
    CANCELLED,
    FINALIZED
}

export interface BetDetail {
    betId: number;
    player1: string;
    player2: string;
    totalAmount: string;
    status: BetStatus;
}

function getWeb3(): Web3 {
    if (!window.ethereum) throw new Error("No MetaMask found")
    return new Web3(window.ethereum)
}

function getContract(web3?: Web3): Contract<typeof ABI> {
    if (!web3) web3 = getWeb3()
    return new web3.eth.Contract(ABI, `${process.env.REACT_APP_CONTRACT_ADDRESS}`)
}

export async function createBet(matchId: number, choice: Choice): Promise<any> {
    const contract = getContract()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return contract.methods.createBet(matchId, choice).send({
        from: accounts[0],
        value: Web3.utils.toWei('0.1', 'ether')
    })
}

export async function joinBet(betId: number, choice: Choice): Promise<any> {
    const contract = getContract()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return contract.methods.joinBet(betId, choice).send({
        from: accounts[0],
        value: Web3.utils.toWei('0.1', 'ether')
    })
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

export async function finalizeBet(betId: number, result: Choice): Promise<any> {
    const contract = getContract()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return contract.methods.finalizeBet(betId, result).send({ from: accounts[0] })
}

export async function getBet(betId: number): Promise<any> {
    const contract = getContract()
    return contract.methods.bets(betId).call()
}

export async function getOwner(): Promise<string> {
    const contract = getContract()
    return contract.methods.owner().call()
}

export async function getDepositFee(): Promise<string> {
    const contract = getContract()
    return contract.methods.depositFee().call()
}

export async function getFinalFee(): Promise<string> {
    const contract = getContract()
    return contract.methods.finalFee().call()
}

export async function getBetsByMatch(matchId: number): Promise<BetDetail[]> {
    const contract = getContract()
    return contract.methods.listBetsByMatch(matchId).call()
}

export async function getBetsByAddress(address: string, index: number): Promise<number> {
    const contract = getContract()
    return contract.methods.betsByAddress(address, index).call()
}