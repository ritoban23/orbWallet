import React, { useState } from "react";
import SolanaWalletGenerator from "./SolanaWalletGenerator";
import EthereumWalletGenerator from "./EthereumWalletGenerator";
import "../componentStyles/WalletSetup.css";

const WalletSetup: React.FC = () => {
  const [chain, setChain] = useState<"solana" | "ethereum" | "">("");

  const handleSelectChain = (selected: "solana" | "ethereum") => {
    setChain(selected);
  };

  const handleBack = () => {
    setChain("");
  };

  return (
    <div className="wallet-container">
      <h1 className="title">Multi-Chain Wallet Generator</h1>

      {!chain && (
        <div className="chain-selection">
          <button
            onClick={() => handleSelectChain("solana")}
            className="chain-button solana-button"
          >
            <span>🔮</span>
            Solana
          </button>
          <button
            onClick={() => handleSelectChain("ethereum")}
            className="chain-button ethereum-button"
          >
            <span>⟠</span>
            Ethereum
          </button>
        </div>
      )}

      {chain === "solana" && <SolanaWalletGenerator onBack={handleBack} />}
      {chain === "ethereum" && <EthereumWalletGenerator onBack={handleBack} />}
    </div>
  );
};

export default WalletSetup;




