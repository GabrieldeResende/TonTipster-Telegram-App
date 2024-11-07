import React, { useState, useEffect } from 'react';
import TonWeb from 'tonweb';

const ConnectWalletButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    try {
      const tonweb = new TonWeb();
      const provider = await window.ton?.connect(); // Verifica se o cliente possui uma carteira TON compatível
      if (provider) {
        const walletInfo = await provider.getProviderState();
        setWalletAddress(walletInfo.wallet.address);
        setIsConnected(true);
      } else {
        alert("TON Wallet não detectada. Por favor, instale uma carteira compatível.");
      }
    } catch (error) {
      console.error("Erro ao conectar a carteira TON:", error);
    }
  };

  useEffect(() => {
    // Verifica se já existe uma conexão ativa
    if (window.ton && window.ton.isConnected) {
      connectWallet();
    }
  }, []);

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Carteira Conectada: {walletAddress}</p>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
