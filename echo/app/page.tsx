"use client"

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    console.log("User Input:", input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      {/* Title */}
      <h1 className="text-6xl font-extrabold mb-1 text-center relative">
        <span className="absolute left-0 right-1 top-1 text-gray-400 opacity-50">Echo</span>
        Echo
      </h1>

      {/* Subtitle */}
      <h2 className="text-2xl text-center mb-8">
        Create playlists based on your mood.
      </h2>
      
      {/* Input Box with Enter Button */}
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Input how you feel..."
          className="w-full p-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white pr-23"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-black transition bg-transparent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
}