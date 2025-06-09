# Multi-Chain Wallet Generator

A React-based web wallet generator for **Ethereum** and **Solana** blockchains.  
Allows users to generate secure mnemonics, derive multiple wallets using standard HD paths, and manage wallets easily — all within a clean UI.

---

## Features

- Generate a new **mnemonic seed phrase** (BIP39 standard)
- Derive multiple wallets from a single mnemonic using HD derivation paths
- Support for both **Ethereum** (EVM) and **Solana** wallets
- View public addresses and private keys for each generated wallet
- Delete individual wallets or clear all wallets
- Switch between Ethereum and Solana wallet generation modes
- Responsive UI built with React and Tailwind CSS

---

## Tech Stack

- React + TypeScript (Vite scaffold)
- Ethereum wallet generation with [ethers.js v6](https://docs.ethers.org/v6/)
- Solana wallet generation with [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)
- Mnemonic generation via [bip39](https://github.com/bitcoinjs/bip39)
- Key derivation using [ed25519-hd-key](https://github.com/bitcoinjs/ed25519-hd-key) (for Solana)
- UI styling with plain CSS

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

````markdown
```bash
git clone https://github.com/yourusername/orbWallet.git
cd orbWallet
```

Install dependencies:

```bash
npm install
# or
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view in your browser.

## Security Notice

- **Never share your mnemonic or private keys publicly.**
- This project is for educational/demo purposes only.
- Do not use generated wallets with real funds unless you fully understand the risks.
