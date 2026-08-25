import { Dices } from "lucide-react";

interface TerritoryCounterProps {
  dice: number;
}

function TerritoryCounter({ dice }: TerritoryCounterProps) {
  return (
    <div
      className="
        flex items-center gap-1
        rounded-md
        border border-white/20
        bg-slate-800/80 backdrop-blur-sm
        px-2 py-1
        text-sm font-bold text-white
        shadow-lg
        select-none
        pointer-events-none
      "
    >
      <Dices size={16} className="text-slate-200" />
      <span>{dice}</span>
    </div>
  );
}

export default TerritoryCounter;
