import { useState, useRef, useEffect } from "react";
import type { Player } from "../data/territories";
import { PLAYER_COLORS } from "./GameMap";

interface GameHeaderProps {
  disabled: boolean;
  round: number;
  currentPlayer: Player;
  currentPlayerName: string;
  onEndTurn: () => void;
}

export default function GameHeader({
  disabled,
  round,
  currentPlayer,
  currentPlayerName,
  onEndTurn,
}: GameHeaderProps) {
  const [isCooldown, setIsCooldown] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (disabled || isCooldown) return;

    onEndTurn();

    setIsCooldown(true);

    timeoutRef.current = setTimeout(() => {
      setIsCooldown(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isButtonDisabled = disabled || isCooldown;

  return (
    <div
      className="flex items-center gap-6 bg-slate-800/90 border border-slate-700 px-6 py-3 rounded-2xl shadow-xl backdrop-blur-md z-10"
      style={{ backgroundColor: PLAYER_COLORS[currentPlayer] }}
    >
      <div className="text-black font-bold text-sm">
        RUNDA <span className="text-black text-lg ml-1">{round}</span>
      </div>

      <div className="h-6 w-[1px] bg-slate-700" />

      <div className="flex items-center gap-3">
        <span className="text-black text-sm font-semibold">Na potezu:</span>
        <div className="flex items-center gap-2">
          <span className="font-bold text-black uppercase tracking-wide">
            {currentPlayerName}
          </span>
        </div>
      </div>

      <button
        disabled={isButtonDisabled}
        onClick={handleClick}
        className={`ml-4 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition-all ${
          isButtonDisabled
            ? "opacity-50 cursor-not-allowed scale-100"
            : "hover:scale-105 active:scale-95 cursor-pointer"
        }`}
      >
        Kraj poteza
      </button>
    </div>
  );
}
