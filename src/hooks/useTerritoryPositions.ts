import { useEffect, useState, type RefObject } from "react";
import type { Territory } from "../data/territories";

interface Position {
  left: number;
  top: number;
}

export type TerritoryPositions = Record<string, Position>;

export function useTerritoryPositions(
  mapRef: RefObject<HTMLDivElement | null>,
  territories: Territory[],
) {
  const [positions, setPositions] = useState<TerritoryPositions>({});

  useEffect(() => {
    if (!mapRef.current) return;
    const svg = mapRef.current.querySelector("svg");
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>(".land");
    const svgRect = svg.getBoundingClientRect();
    const newPositions: TerritoryPositions = {};

    paths.forEach((path) => {
      const id = path.getAttribute("id");
      if (!id) return;

      const territory = territories.find((t) => t.id === id);
      if (!territory) return;

      const box = path.getBBox();
      const point = svg.createSVGPoint();
      point.x = box.x + box.width / 2;
      point.y = box.y + box.height / 2;

      const screenPoint = point.matrixTransform(svg.getScreenCTM()!);
      const left = ((screenPoint.x - svgRect.left) / svgRect.width) * 100;
      const top = ((screenPoint.y - svgRect.top) / svgRect.height) * 100;

      newPositions[id] = { left, top };
    });

    setPositions(newPositions);
  }, [mapRef, territories]);

  return positions;
}
