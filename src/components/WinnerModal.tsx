import type { Player } from "../data/territories";
import { PLAYER_COLORS } from "./GameMap";

interface WinnerModalProps {
  winner: Player | null;
  winnerName: string;
  onReturnToMenu: () => void;
}

export default function WinnerModal({
  winner,
  winnerName,
  onReturnToMenu,
}: WinnerModalProps) {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center text-center gap-6">
        <h2 className="text-2xl font-black text-white uppercase tracking-wide">
          Pobeda!
        </h2>
        <div className="flex items-center justify-center gap-3">
          <span
            className="w-6 h-6 rounded-full shadow-md"
            style={{ backgroundColor: PLAYER_COLORS[winner] }}
          />
          <span className="text-xl font-bold text-white uppercase">
            {winnerName} je pobednik.
          </span>
        </div>
        <button
          onClick={onReturnToMenu}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm cursor-pointer"
        >
          Povratak u meni
        </button>
      </div>
    </div>
  );
}
