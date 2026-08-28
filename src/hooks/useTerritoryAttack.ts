import { useEffect, useState, type RefObject } from "react";
import type { Player, Territory } from "../data/territories";
import { PLAYER_COLORS } from "../components/GameMap";
import { adjustColorBrightness } from "../helperFunctions/adjustColorBrightness";

export function useTerritoryAttack(
  mapRef: RefObject<HTMLDivElement | null>,
  territories: Territory[],
  currentPlayer: Player,
  disabled: boolean = false,
  onAttack?: (attackerId: string, defenderId: string) => void,
) {
  const [attackerId, setAttackerId] = useState<string | null>(null);
  const [defenderId, setDefenderId] = useState<string | null>(null);
  const [hoveredTerritoryId, setHoveredTerritoryId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setAttackerId(null);
    setDefenderId(null);
  }, [currentPlayer]);

  const handleTerritoryClick = (clickedTerritory: Territory) => {
    if (disabled) return;

    if (!attackerId) {
      if (
        clickedTerritory.owner === currentPlayer &&
        clickedTerritory.dice > 1
      ) {
        setAttackerId(clickedTerritory.id);
      }
      return;
    }

    if (attackerId === clickedTerritory.id) {
      setAttackerId(null);
      setDefenderId(null);
      return;
    }

    const currentAttacker = territories.find((t) => t.id === attackerId);
    if (!currentAttacker) return;

    if (clickedTerritory.owner === currentPlayer) {
      if (clickedTerritory.dice > 1) {
        setAttackerId(clickedTerritory.id);
        setDefenderId(null);
      }
      return;
    }

    const isNeighbor = currentAttacker.neighbors.includes(clickedTerritory.id);
    if (isNeighbor) {
      setDefenderId(clickedTerritory.id);
      if (onAttack) {
        onAttack(attackerId, clickedTerritory.id);
      }
      setAttackerId(null);
      setDefenderId(null);
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;
    const svg = mapRef.current.querySelector("svg");
    if (!svg) return;

    territories.forEach((territory) => {
      const path = svg.querySelector<SVGPathElement>(`#${territory.id}`);
      if (!path) return;

      const baseColor = PLAYER_COLORS[territory.owner];
      const isHovered = !disabled && hoveredTerritoryId === territory.id;
      const isAttacker = attackerId === territory.id;
      const isDefender = defenderId === territory.id;

      path.style.fill = isHovered
        ? adjustColorBrightness(baseColor, -20)
        : baseColor;

      if (isAttacker) {
        path.style.stroke = "#3b82f6";
        path.style.strokeWidth = "3.5";
      } else if (isDefender) {
        path.style.stroke = "#ef4444";
        path.style.strokeWidth = "3.5";
      } else {
        path.style.stroke = "#000000";
        path.style.strokeWidth = isHovered ? "2" : "1";
      }

      path.style.cursor = disabled ? "not-allowed" : "pointer";

      if (isHovered || isAttacker || isDefender) {
        path.parentNode?.appendChild(path);
      }

      path.onmouseenter = () => {
        if (!disabled) setHoveredTerritoryId(territory.id);
      };
      path.onmouseleave = () => {
        if (!disabled) setHoveredTerritoryId(null);
      };
      path.onclick = () => handleTerritoryClick(territory);
    });
  }, [
    mapRef,
    hoveredTerritoryId,
    attackerId,
    defenderId,
    territories,
    currentPlayer,
    disabled,
  ]);

  return { attackerId, defenderId };
}
