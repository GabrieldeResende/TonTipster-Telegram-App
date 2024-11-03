"use client";
import React, { useState } from 'react';

const ITEMS_PER_PAGE = 10;

const leaderboardData = [
    { address: "0x12abF09a2345cD7F89B34ef0A23C678a34efA09c", amount: "$ 10,000.00" },
    { address: "0x56cdF09aB9c67b45a89BcF45C67891dF23bc67Ef", amount: "$ 500.00" },
    { address: "0x90ijB67e8c23A9019fCd56aB8901Df4C78e9A0bF", amount: "$ 1,500.00" },
    { address: "0x34mnD7e9C45c67a12bC90ef1234f23a8F09Bc45E", amount: "$ 300.00" },
    { address: "0x78qrF1b3a09cD45aB8C90Ef678aB901D67Bc90f3", amount: "$ 750.00" },
    { address: "0x01uvC9d2b45Ef67b89F0aB23dC90f4a1B2C8d9eE", amount: "$ 300.00" },
    { address: "0x45yzB09aC4f3aD78bC5d90E23cD9fAbC7890F123", amount: "$ 900.00" },
    { address: "0x89cdB1fA34c8D90a1234Ef67bC23d9A01bC0d9fE", amount: "$ 100.00" },
    { address: "0x23ghB2e3f45A89cD7B90efA0a12dC90eB1f45C78", amount: "$ 250.00" },
    { address: "0x67klF3a23c9E45bB2d9fA01c67B890f12D3c45Ef", amount: "$ 200.00" },
    { address: "0x01opD8fB23c67e9a45BfA09bC12d45F67b8A90Ef", amount: "$ 3,300.00" },
    { address: "0x45stC0d9fE12cB45aB8F23e0fC90A09d12d45E3f", amount: "$ 2,400.00" },
    { address: "0x89wxE4f5A23d90bC67aB0f12D3cB8Ef01C45D89F", amount: "$ 1,000.00" },
    { address: "0x23abA09fC23D8e67Bf4c90A12B8D5E3f12C78A4E", amount: "$ 2,700.00" },
    { address: "0x67efD5e9B01cA34f23Bc8d7aE01B90c12A45eF90", amount: "$ 800.00" },
    { address: "0x01ijF4c9D12a45B78dEf9aB23fC45C8e90D23B67", amount: "$ 250.00" },
    { address: "0x45mnE2a34C8dB67fA12B90e01D9cF23B45cA90d7", amount: "$ 4,900.00" },
    { address: "0x89qrB3c9D67fA01E4bA8C12BfD23c45D89A90Ef2", amount: "$ 3,500.00" },
    { address: "0x23uvF7c01aB45D9eB8C90a1234D5e9fBc90C01e7", amount: "$ 600.00" },
    { address: "0x67yzD2b4cE3a90fA12Bc67d9A45Ef01C9Bf23A4F", amount: "$ 750.00" },
];

export default function LeaderBoard() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(leaderboardData.length / ITEMS_PER_PAGE);

    const paginatedData = leaderboardData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const maxPages = 3;
        const half = Math.floor(maxPages / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + maxPages - 1, totalPages);

        if (end - start < maxPages - 1) {
            start = Math.max(end - maxPages + 1, 1);
        }

        return [...Array(end - start + 1)].map((_, idx) => start + idx);
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}....${address.slice(-4)}`;
    };

    return (
        <div className="bg-black text-white h-full p-5">
            <h1 className="text-center text-xl font-bold mb-5">GLOBAL LEADERBOARD</h1>
            <div className="bg-purple-700 p-3 rounded-lg">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">Address</th>
                            <th className="p-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((data, index) => (
                            <tr key={index} className="border-t border-purple-900">
                                <td className="p-2">{formatAddress(data.address)}</td>
                                <td className="p-2">{data.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-center mt-4'>
                <button
                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {getPageNumbers().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`px-4 py-2 mx-1 rounded-lg ${currentPage === pageNumber ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
