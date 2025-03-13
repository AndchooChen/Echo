"use client";

import { useState } from "react";
import axios from 'axios';
import CurrentSong from "@/components/currentSong";

export default function Home() {
  const [input, setInput] = useState("");
  const [bestMatch, setBestMatch] = useState("");
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState({
    image: "/cover.jpg",
    title: "Sample Song",
    uri: "",
  });

  /*
  const handleSubmit = async () => {
    if (input) {
      setLoading(true);
      try {
        const res = await axios.post('/api/emotion', { input });
        setBestMatch(res.data.bestMatch);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
      setLoading(false);
    }
  };
  */

  const handleSubmit = async () => {
    if (input) {
      setLoading(true);
      try {
        // Step 1: Get best-matching playlist
        const res = await axios.post("/api/emotion", { input });
        setBestMatch(res.data.primaryEmotion.label);
        console.log(res.data.primaryEmotion.label);

        // Step 2: Get a song from Spotify based on the emotion
        const songRes = await axios.post("/api/get-song", { mood: res.data.primaryEmotion.label });

        if (songRes.data && songRes.data.track) {
          setSong({
            image: songRes.data.track.image,
            title: songRes.data.track.title,
            uri: songRes.data.track.uri,
          });
        }
      } catch (error) {
        console.error("Error fetching song:", error);
      }
      setLoading(false);
    }
  };

  const playSong = async () => {
    if (!song.uri) return;
    try {
      await axios.post("/api/play-song", { trackUri: song.uri });
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  // Mock song data (replace with actual data from API or state)
  const mockSong = {
    image: "/app/cover.jpg",
    title: "Sample Song",
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
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Emotion"}
        </button>
      </div>

      {/* Response Display */}
      {bestMatch && (
        <div className="mt-8 p-4 bg-gray-700 text-white rounded-lg max-w-xl">
          <h3 className="text-xl font-semibold mb-2">Best Matching Playlist:</h3>
          <p>{bestMatch}</p>
        </div>
      )}

      {/* Current Song Component */}
      <div className="mt-8">
        <CurrentSong song={song} onPrev={() => {}} onNext={() => {}} onPlay={playSong} />
      </div>
    </div>
  );
}
