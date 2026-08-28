import { useEffect, useState, useMemo } from "react";
import type { Player } from "../data/territories";
import { PLAYER_COLORS } from "./GameMap";
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  type LucideIcon,
} from "lucide-react";

const DICE_ICONS: Record<number, LucideIcon> = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

function decomposeRollIntoDice(total: number, diceCount: number): number[] {
  if (diceCount <= 0) return [];

  const rolls = Array(diceCount).fill(1);
  let remaining = total - diceCount;

  while (remaining > 0) {
    const eligibleIndexes = rolls
      .map((value, index) => ({ value, index }))
      .filter((entry) => entry.value < 6);

    if (eligibleIndexes.length === 0) break;

    const pick =
      eligibleIndexes[Math.floor(Math.random() * eligibleIndexes.length)];
    rolls[pick.index] += 1;
    remaining -= 1;
  }

  return rolls;
}

interface BattlePanelProps {
  isOpen: boolean;
  isBattling: boolean;
  attacker: Player;
  defender: Player;
  attackerName: string;
  defenderName: string;
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
  attackerName,
  defenderName,
  attackerRoll,
  defenderRoll,
  attackerDiceCount,
  defenderDiceCount,
  hasWon,
  onClose,
}: BattlePanelProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [tempAttackerRolls, setTempAttackerRolls] = useState<number[]>([]);
  const [tempDefenderRolls, setTempDefenderRolls] = useState<number[]>([]);

  const attackerFinalRolls = useMemo(
    () => decomposeRollIntoDice(attackerRoll, attackerDiceCount),
    [attackerRoll, attackerDiceCount],
  );

  const defenderFinalRolls = useMemo(
    () => decomposeRollIntoDice(defenderRoll, defenderDiceCount),
    [defenderRoll, defenderDiceCount],
  );

  useEffect(() => {
    if (!isBattling) {
      setIsRolling(false);
      return;
    }

    setIsRolling(true);

    setTempAttackerRolls(
      Array.from(
        { length: attackerDiceCount },
        () => Math.floor(Math.random() * 6) + 1,
      ),
    );
    setTempDefenderRolls(
      Array.from(
        { length: defenderDiceCount },
        () => Math.floor(Math.random() * 6) + 1,
      ),
    );

    const interval = setInterval(() => {
      setTempAttackerRolls((prev) =>
        prev.map(() => Math.floor(Math.random() * 6) + 1),
      );
      setTempDefenderRolls((prev) =>
        prev.map(() => Math.floor(Math.random() * 6) + 1),
      );
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
  }, [
    isBattling,
    attackerRoll,
    defenderRoll,
    attackerDiceCount,
    defenderDiceCount,
    onClose,
  ]);

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
            playerName={attackerName}
            label="Napada"
            rolls={isRolling ? tempAttackerRolls : attackerFinalRolls}
            total={attackerRoll}
            isRolling={isRolling}
          />
          <DiceCard
            player={defender}
            playerName={defenderName}
            label="Brani"
            rolls={isRolling ? tempDefenderRolls : defenderFinalRolls}
            total={defenderRoll}
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
  playerName,
  label,
  rolls,
  total,
  isRolling,
}: {
  player: Player;
  playerName: string;
  label: string;
  rolls: number[];
  total: number;
  isRolling: boolean;
}) {
  const currentDisplayTotal = isRolling
    ? rolls.reduce((sum, val) => sum + val, 0)
    : total;

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: PLAYER_COLORS[player] }}
        />
        <span className="text-s font-bold text-slate-300 uppercase">
          {playerName} ({label})
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 my-1 max-w-[150px]">
        {rolls.map((value, index) => {
          const DiceIcon = DICE_ICONS[value] ?? Dice1;
          return (
            <DiceIcon
              key={index}
              strokeWidth={1.75}
              className={`w-7 h-7 transition-transform ${
                isRolling
                  ? "text-amber-400 animate-spin scale-140"
                  : "text-white scale-140"
              }`}
            />
          );
        })}
      </div>

      <span className="text-xl text-slate-400 font-medium">
        Ukupno:{" "}
        <span className="font-bold text-slate-200">{currentDisplayTotal}</span>
      </span>
    </div>
  );
}
