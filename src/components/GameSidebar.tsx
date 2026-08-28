import type { Player, Territory } from "../data/territories";
import PlayerStatCard from "./PlayerStatCard";

interface GameSidebarProps {
  territories: Territory[];
  players: Player[];
  currentPlayer: Player;
  eliminatedPlayers: Player[];
  getPlayerName: (player: Player) => string;
}

export default function GameSidebar({
  territories,
  players,
  currentPlayer,
  eliminatedPlayers,
  getPlayerName,
}: GameSidebarProps) {
  const totalTerritories = territories.length;
  const totalDiceOnMap = territories.reduce((acc, t) => acc + t.dice, 0);

  const playerStats = players.map((player) => {
    const playerTerritories = territories.filter((t) => t.owner === player);
    const territoryCount = playerTerritories.length;
    const totalDice = playerTerritories.reduce((acc, t) => acc + t.dice, 0);
    const mapPercentage =
      Math.round((territoryCount / totalTerritories) * 100) || 0;
    const isEliminated = eliminatedPlayers.includes(player);
    const isCurrent = player === currentPlayer;

    return {
      player,
      getPlayerName,
      territoryCount,
      totalDice,
      mapPercentage,
      isEliminated,
      isCurrent,
    };
  });

  return (
    <aside className="w-72 bg-slate-800/90 border-r border-slate-700/80 p-4 flex flex-col gap-4 h-full overflow-y-auto shrink-0 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-slate-700 pb-3">
        <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          Statistika
        </h2>
        <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg border border-amber-400/20">
          Kockica na mapi: {totalDiceOnMap}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {playerStats.map((stat) => (
          <PlayerStatCard key={stat.player} stat={stat} />
        ))}
      </div>
    </aside>
  );
}
