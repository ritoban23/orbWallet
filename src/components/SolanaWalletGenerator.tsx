import React, { useState } from "react";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import "../componentStyles/WalletGenerators.css";

interface WalletInfo {
  publicKey: string;
  privateKey: string;
}

interface Props {
  onBack: () => void;
}

const SolanaWalletGenerator: React.FC<Props> = ({ onBack }) => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [seed, setSeed] = useState<Buffer | null>(null);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [walletIndex, setWalletIndex] = useState<number>(0);

  const handleGenerateMnemonic = () => {
    const newMnemonic = generateMnemonic();
    const newSeed = mnemonicToSeedSync(newMnemonic);
    setMnemonic(newMnemonic);
    setSeed(newSeed);
    setWallets([]);
    setWalletIndex(0);
  };

  const handleAddWallet = () => {
    if (!seed) return alert("Generate mnemonic first.");

    const path = `m/44'/501'/${walletIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
    const keypairSolana = Keypair.fromSecretKey(keypair.secretKey);

    setWallets([
      ...wallets,
      {
        publicKey: keypairSolana.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString("hex"),
      },
    ]);
    setWalletIndex(walletIndex + 1);
  };

  const deleteWallet = (index: number) => {
    setWallets(wallets.filter((_, i) => i !== index));
  };

  const clearAllWallets = () => {
    setWallets([]);
    setWalletIndex(0);
  };

  return (
    <div className="wallet-generator-container animate-fadeIn">
      <div className="wallet-generator-header">
        <h2 className="wallet-generator-title text-purple-700">
          🔮 Solana Wallet Generator
        </h2>
        <button onClick={onBack} className="back-button">
          ← Back to Chain Selection
        </button>
      </div>

      <div className="button-group">
        <button
          onClick={handleGenerateMnemonic}
          className="action-button generate-button"
        >
          🎲 Generate Mnemonic
        </button>
        <button
          onClick={handleAddWallet}
          className="action-button add-wallet-button"
          disabled={!mnemonic}
        >
          ➕ Add Wallet
        </button>
        {wallets.length > 0 && (
          <button
            onClick={clearAllWallets}
            className="action-button delete-all-button"
          >
            🗑️ Delete All
          </button>
        )}
      </div>

      {mnemonic && (
        <div className="mnemonic-section animate-slideIn">
          <div className="mnemonic-label">🔑 Seed Phrase (Mnemonic):</div>
          <div className="mnemonic-text">{mnemonic}</div>
          <div className="text-center mt-2">
            <small className="text-gray-600">
              ⚠️ Store this seed phrase securely. Anyone with access can control your wallets.
            </small>
          </div>
        </div>
      )}

      {wallets.length > 0 && (
        <div className="wallets-section animate-fadeIn">
          <div className="wallets-title">
            💰 Generated Wallets ({wallets.length})
          </div>
          {wallets.map((wallet, index) => (
            <div key={index} className="wallet-card">
              <button
                onClick={() => deleteWallet(index)}
                className="delete-wallet-button"
                title="Delete this wallet"
              >
                🗑️ Delete
              </button>
              <div className="wallet-number">
                📱 Wallet #{index + 1}
              </div>
              <div className="wallet-key">
                <span className="wallet-key-label">Public:</span>
                <span className="wallet-key-value">{wallet.publicKey}</span>
              </div>
              <div className="wallet-key">
                <span className="wallet-key-label">Private:</span>
                <span className="wallet-key-value">{wallet.privateKey}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {wallets.length === 0 && mnemonic && (
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Click "Add Wallet" to generate your first Solana wallet from the seed phrase.
          </p>
        </div>
      )}
    </div>
  );
};

export default SolanaWalletGenerator;
