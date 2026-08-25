import { useState } from "react";

interface MainMenuProps {
  onStartGame: (playerCount: number) => void;
}

function MainMenu({ onStartGame }: MainMenuProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<number>(2);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md max-w-md w-full text-white">
      <h1 className="text-4xl font-extrabold tracking-wider mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500">
        NEGUS
      </h1>
      <p className="text-slate-400 mb-8 text-sm">Serbia Edition</p>

      <div className="w-full mb-8">
        <label className="block text-center text-sm font-semibold mb-3 text-slate-300">
          Izaberi broj igrača:
        </label>

        <div className="grid grid-cols-5 gap-2">
          {[2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedPlayers(num)}
              className={`
                py-3 rounded-xl font-bold text-lg transition-all
                ${
                  selectedPlayers === num
                    ? "bg-blue-600 text-white scale-105 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400"
                    : "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
                }
              `}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStartGame(selectedPlayers)}
        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xl rounded-xl shadow-lg transition-transform active:scale-95"
      >
        Započni igru
      </button>
    </div>
  );
}

export default MainMenu;
