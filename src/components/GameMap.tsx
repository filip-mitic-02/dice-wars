import { useRef } from "react";
import SerbiaMap from "../assets/maps/serbia.svg?react";
import TerritoryBadge from "./TerritoryBadge";
import type { Player, Territory } from "../data/territories.ts";
import { useTerritoryPositions } from "../hooks/useTerritoryPositions";
import { useTerritoryAttack } from "../hooks/useTerritoryAttack";

export const PLAYER_COLORS: Record<Player, string> = {
  player1: "#2563eb",
  player2: "#dc2626",
  player3: "#16a34a",
  player4: "#d97706",
  player5: "#9333ea",
  player6: "#f4e806",
};

interface GameMapProps {
  territories: Territory[];
  currentPlayer: Player;
  handleEndGame: () => void;
  onAttack?: (attackerId: string, defenderId: string) => void;
}

export default function GameMap({
  territories,
  currentPlayer,
  handleEndGame,
  onAttack,
}: GameMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const positions = useTerritoryPositions(mapRef, territories);
  const { attackerId, defenderId } = useTerritoryAttack(
    mapRef,
    territories,
    currentPlayer,
    onAttack,
  );

  return (
    <div ref={mapRef} className="relative w-[700px]">
      <button
        onClick={handleEndGame}
        className="fixed top-6 right-85 z-50 px-4 py-2 bg-slate-800/90 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl border border-slate-600 backdrop-blur-md shadow-xl transition-all active:scale-95 cursor-pointer"
      >
        Napusti igru
      </button>

      <SerbiaMap className="block w-full h-auto" />

      {territories.map((territory) => (
        <TerritoryBadge
          key={territory.id}
          territory={territory}
          position={positions[territory.id]}
          isAttacker={attackerId === territory.id}
          isDefender={defenderId === territory.id}
        />
      ))}
    </div>
  );
}
