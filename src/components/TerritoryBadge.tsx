import TerritoryCounter from "./TerritoryCounter";
import type { Territory } from "../data/territories";

interface TerritoryBadgeProps {
  territory: Territory;
  position?: { left: number; top: number };
  isAttacker: boolean;
  isDefender: boolean;
}

export default function TerritoryBadge({
  territory,
  position,
  isAttacker,
  isDefender,
}: TerritoryBadgeProps) {
  if (!position) return null;

  let finalLeft = position.left;
  let finalTop = position.top;

  if (territory.offset) {
    finalLeft += territory.offset.x;
    finalTop += territory.offset.y;
  }

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 pointer-events-none ${
        isAttacker || isDefender ? "scale-125 z-10" : "z-0"
      }`}
      style={{
        left: `${finalLeft}%`,
        top: `${finalTop}%`,
      }}
    >
      <TerritoryCounter dice={territory.dice} />
    </div>
  );
}
