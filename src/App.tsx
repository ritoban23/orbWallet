//import { useState } from 'react'
import './App.css'
import WalletSetup from "./components/WalletSetup";
import "./componentStyles/Global.css";


function App() {
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <WalletSetup />
        </div>
    </>
  )
}

export default App
