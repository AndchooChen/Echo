"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    console.log("User Input:", input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Title */}
      <h1 className="text-6xl font-extrabold mb-8 text-center relative">
        <span className="absolute left-0 right-0 top-1 text-gray-400 opacity-50 blur-md">Echo</span>
        Echo
      </h1>
      
      {/* Input Box */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
        className="w-full max-w-xl p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Enter Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 text-white border border-white rounded-md hover:bg-white hover:text-black transition bg-transparent"
      >
        Enter
      </button>
    </div>
  );
}

