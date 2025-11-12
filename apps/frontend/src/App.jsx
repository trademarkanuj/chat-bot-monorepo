import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./styles.css";
import ChatWindow from "./components/ChatWindow";
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ChatWindow />
    </div>
  );
}
