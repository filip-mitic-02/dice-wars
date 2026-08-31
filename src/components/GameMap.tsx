import { useRef } from "react";
import SerbiaMap from "../assets/maps/serbia.svg?react";
import BulgariaMap from "../assets/maps/bulgaria.svg?react";
import TerritoryBadge from "./TerritoryBadge";
import type { MapId, Player, Territory } from "../data/territories.ts";
import { useTerritoryPositions } from "../hooks/useTerritoryPositions";
import { useTerritoryAttack } from "../hooks/useTerritoryAttack";

const MAP_COMPONENTS: Record<MapId, typeof SerbiaMap> = {
  serbia: SerbiaMap,
  bulgaria: BulgariaMap,
};

const MAP_MAX_WIDTHS: Record<MapId, string> = {
  serbia: "max-w-[700px]",
  bulgaria: "max-w-[950px]",
};

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
  mapId: MapId;
  disabled?: boolean;
  handleEndGame: () => void;
  onAttack?: (attackerId: string, defenderId: string) => void;
}

export default function GameMap({
  territories,
  currentPlayer,
  mapId,
  disabled = false,
  handleEndGame,
  onAttack,
}: GameMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const MapComponent = MAP_COMPONENTS[mapId];

  const positions = useTerritoryPositions(mapRef, territories);
  const { attackerId, defenderId } = useTerritoryAttack(
    mapRef,
    territories,
    currentPlayer,
    disabled,
    onAttack,
  );

  return (
    <div
      ref={mapRef}
      className={`relative w-full ${MAP_MAX_WIDTHS[mapId]} mx-auto transition-opacity ${
        disabled ? "pointer-events-none" : ""
      }`}
    >
      <button
        onClick={handleEndGame}
        className="fixed top-6 right-85 z-50 px-4 py-2 bg-slate-800/90 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl border border-slate-600 backdrop-blur-md shadow-xl transition-all active:scale-95 cursor-pointer pointer-events-auto"
      >
        Napusti igru
      </button>

      <MapComponent className="block w-full h-auto" />

      {territories.map((territory: Territory) => (
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
