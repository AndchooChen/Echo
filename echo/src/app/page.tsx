"use client"; // Add this line at the top

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    console.log("User Input:", input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">Echo</h1>
      
      {/* Input Box */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
        className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Enter Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Enter
      </button>
    </div>
  );
}
