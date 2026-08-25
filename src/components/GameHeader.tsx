import type { Player } from "../data/territories";
import { PLAYER_COLORS } from "./GameMap";

interface GameHeaderProps {
  round: number;
  currentPlayer: Player;
  onEndTurn: () => void;
}

export default function GameHeader({
  round,
  currentPlayer,
  onEndTurn,
}: GameHeaderProps) {
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
            {currentPlayer.replace("player", "Igrač ")}
          </span>
        </div>
      </div>

      <button
        onClick={onEndTurn}
        className="ml-4 px-4 py-2 bg-slate-900 hover:scale-105 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all text-sm cursor-pointer"
      >
        Kraj poteza
      </button>
    </div>
  );
}
