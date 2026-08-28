import { useEffect, useState } from "react";
import type { Player } from "../data/territories";
import { PLAYER_COLORS } from "./GameMap";

interface BattlePanelProps {
  isOpen: boolean;
  isBattling: boolean;
  attacker: Player;
  defender: Player;
  attackerRoll: number;
  defenderRoll: number;
  attackerDiceCount: number;
  defenderDiceCount: number;
  hasWon: boolean;
  onClose: () => void;
}

export default function BattlePanel({
  isOpen,
  isBattling,
  attacker,
  defender,
  attackerRoll,
  defenderRoll,
  attackerDiceCount,
  defenderDiceCount,
  hasWon,
  onClose,
}: BattlePanelProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [tempRolls, setTempRolls] = useState({ attacker: 0, defender: 0 });

  useEffect(() => {
    if (!isBattling) {
      setIsRolling(false);
      return;
    }

    setIsRolling(true);

    const interval = setInterval(() => {
      setTempRolls({
        attacker: Math.floor(Math.random() * (attackerDiceCount * 6)) + 1,
        defender: Math.floor(Math.random() * (defenderDiceCount * 6)) + 1,
      });
    }, 25);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsRolling(false);
    }, 500);

    const autoCloseTimeout = setTimeout(() => {
      onClose();
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(autoCloseTimeout);
    };
  }, [isBattling, attackerDiceCount, defenderDiceCount]);

  if (!isOpen) {
    return (
      <aside className="w-80 bg-slate-800 border-l border-slate-700 p-6 flex flex-col items-center justify-center text-center gap-4 text-slate-400">
        <h3 className="text-base font-bold text-slate-300">Borbeni Panel</h3>
        <p className="text-xs">
          Izaberite vašu teritoriju (min 2 kockice) i kliknite na susednu
          neprijateljsku teritoriju da započnete borbu.
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-slate-800 border-l border-slate-700 p-6 flex flex-col items-center justify-between shadow-xl">
      <div className="w-full flex flex-col items-center gap-6">
        <h2 className="text-lg font-extrabold text-white uppercase tracking-wider">
          {isRolling ? "Bacanje kockica..." : "Rezultat Borbe"}
        </h2>

        <div className="flex flex-col gap-4 w-full">
          <DiceCard
            player={attacker}
            label="Napada"
            diceCount={attackerDiceCount}
            value={isRolling ? tempRolls.attacker : attackerRoll}
            isRolling={isRolling}
          />
          <DiceCard
            player={defender}
            label="Brani"
            diceCount={defenderDiceCount}
            value={isRolling ? tempRolls.defender : defenderRoll}
            isRolling={isRolling}
          />
        </div>

        <div
          className={`w-full py-3 text-center rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
            isRolling
              ? "text-slate-400 animate-pulse bg-slate-900/40"
              : hasWon
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-fade-in"
                : "bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-fade-in"
          }`}
        >
          {isRolling
            ? "Bacanje u toku..."
            : hasWon
              ? "Pobeda napadača!"
              : "Napad odbijen!"}
        </div>
      </div>
    </aside>
  );
}

function DiceCard({
  player,
  label,
  diceCount,
  value,
  isRolling,
}: {
  player: Player;
  label: string;
  diceCount: number;
  value: number;
  isRolling: boolean;
}) {
  const formatDiceText = (count: number) => {
    if (count === 1) return "1 kockice";
    if (count >= 2 && count <= 4) return `${count} kockice`;
    return `${count} kockica`;
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: PLAYER_COLORS[player] }}
        />
        <span className="text-xs font-bold text-slate-300 uppercase">
          {player.replace("player", "Igrač ")} ({label})
        </span>
      </div>

      <div
        className={`text-4xl font-black my-1 transition-transform ${
          isRolling
            ? "text-amber-400 scale-110 animate-pulse"
            : "text-white scale-100"
        }`}
      >
        {value}
      </div>

      <span className="text-xs text-slate-400 font-medium">
        sa {formatDiceText(diceCount)}
      </span>
    </div>
  );
}
