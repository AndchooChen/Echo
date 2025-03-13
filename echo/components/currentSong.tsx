import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Song {
  image: string;
  title: string;
}

interface CurrentSongProps {
  song: Song;
  onPrev: () => void;
  onNext: () => void;
  onPlay: () => void;
}

export default function CurrentSong({ song, onPrev, onNext, onPlay }: CurrentSongProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
      <div className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-2xl shadow-lg w-80">
          {/* Song Image */}
          <img 
              src={song.image} 
              alt={song.title} 
              className="w-60 h-60 rounded-lg object-cover mb-4" 
          />
          
          {/* Controls */}
          <div className="flex items-center space-x-4 mb-4">
              <button onClick={onPrev} className="p-2 bg-gray-700 rounded-full">
                  <SkipBack size={24} />
              </button>
              <button 
                  onClick={() => { setIsPlaying(!isPlaying); onPlay(); }} 
                  className="p-3 bg-green-500 rounded-full"
              >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              <button onClick={onNext} className="p-2 bg-gray-700 rounded-full">
                  <SkipForward size={24} />
              </button>
          </div>
      </div>
  );
}
