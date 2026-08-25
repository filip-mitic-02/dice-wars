import type { Player } from "../data/territories";
import { PLAYER_COLORS } from "./GameMap";

export interface PlayerStat {
  player: Player;
  territoryCount: number;
  totalDice: number;
  mapPercentage: number;
  isCurrent: boolean;
  isEliminated: boolean;
}

interface PlayerStatCardProps {
  stat: PlayerStat;
}

export default function PlayerStatCard({ stat }: PlayerStatCardProps) {
  return (
    <div
      className={`p-3 rounded-2xl border transition-all ${
        stat.isEliminated
          ? "bg-slate-900/30 border-slate-800/50 opacity-40"
          : stat.isCurrent
            ? "bg-slate-900/90 border-amber-400 shadow-md shadow-amber-500/10 scale-[1.02]"
            : "bg-slate-900/60 border-slate-700/60"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: PLAYER_COLORS[stat.player] }}
          />
          <span className="text-xs font-bold text-white uppercase">
            {stat.player.replace("player", "Igrač ")}
          </span>
          {stat.isCurrent && !stat.isEliminated && (
            <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse border border-amber-400/30">
              Potez
            </span>
          )}
        </div>
        <span className="text-[11px] font-bold text-slate-400">
          {stat.mapPercentage}%
        </span>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden border border-slate-700">
        <div
          className="h-full transition-all duration-300 rounded-full"
          style={{
            width: `${stat.mapPercentage}%`,
            backgroundColor: PLAYER_COLORS[stat.player],
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
        <div className="bg-slate-800/60 p-1.5 rounded-lg border border-slate-700/40">
          <span className="block text-slate-400 text-[10px] font-medium">
            Teritorije
          </span>
          <span className="font-extrabold text-white">
            {stat.territoryCount}
          </span>
        </div>
        <div className="bg-slate-800/60 p-1.5 rounded-lg border border-slate-700/40">
          <span className="block text-slate-400 text-[10px] font-medium">
            Kockice
          </span>
          <span className="font-extrabold text-white">{stat.totalDice}</span>
        </div>
      </div>
    </div>
  );
}
