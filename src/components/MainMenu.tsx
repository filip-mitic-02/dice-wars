import { useState } from "react";
import type { Player } from "../data/territories";
import { PLAYER_COLORS } from "./GameMap";

interface MainMenuProps {
  onStartGame: (
    playerCount: number,
    playerNames: Record<string, string>,
  ) => void;
}

export default function MainMenu({ onStartGame }: MainMenuProps) {
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [names, setNames] = useState<string[]>(["Igrač 1", "Igrač 2"]);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setNames((prev) =>
      Array.from({ length: count }, (_, i) => prev[i] || `Igrač ${i + 1}`),
    );
  };

  const handleNameChange = (index: number, newName: string) => {
    const updated = [...names];
    updated[index] = newName;
    setNames(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const playerNamesMap: Record<string, string> = {};
    names.forEach((name, index) => {
      const playerId = `player${index + 1}`;
      playerNamesMap[playerId] = name.trim() || `Igrač ${index + 1}`;
    });

    onStartGame(playerCount, playerNamesMap);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-800/90 border border-slate-700/80 rounded-3xl shadow-2xl backdrop-blur-md max-w-md w-full">
      <h1 className="text-3xl font-extrabold text-sky-400 mb-6 uppercase tracking-wider">
        Dice Wars
      </h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Izaberite broj igrača:
          </label>
          <div className="flex gap-3">
            {[2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handlePlayerCountChange(num)}
                className={`flex-1 py-2 rounded-xl font-bold transition-all border ${
                  playerCount === num
                    ? "bg-sky-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/25 scale-105"
                    : "bg-slate-900/50 text-slate-300 border-slate-700 hover:bg-slate-700/60 hover:text-white"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="block text-slate-300 font-semibold text-sm">
            Imena igrača:
          </label>
          {names.map((name, index) => {
            const playerId = `player${index + 1}` as Player;
            const playerColor = PLAYER_COLORS[playerId];

            return (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm border border-black/20"
                  style={{ backgroundColor: playerColor }}
                  title={`Boja za Igrača ${index + 1}`}
                />

                <span className="text-xs font-bold text-slate-400 w-14 shrink-0">
                  Igrač {index + 1}:
                </span>

                <input
                  type="text"
                  value={name}
                  maxLength={15}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Igrač ${index + 1}`}
                  className="flex-1 px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 font-medium focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all text-sm"
                />
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-sky-500/20 transition-all active:scale-95 text-base uppercase tracking-wider cursor-pointer"
        >
          Započni igru
        </button>
      </form>
    </div>
  );
}
