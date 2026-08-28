import type { Territory, Player } from "../data/territories";

export function getMaxConnectedTerritories(
  territories: Territory[],
  player: Player,
): number {
  const playerTerritories = territories.filter((t) => t.owner === player);

  if (playerTerritories.length === 0) return 0;

  const territoryMap = new Map<string, Territory>(
    territories.map((t) => [t.id, t]),
  );

  const visited = new Set<string>();
  let maxConnected = 0;

  for (const territory of playerTerritories) {
    if (visited.has(territory.id)) continue;

    const queue: string[] = [territory.id];
    visited.add(territory.id);
    let currentClusterSize = 0;

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      currentClusterSize++;

      const currentTerritory = territoryMap.get(currentId);

      if (currentTerritory) {
        for (const neighborId of currentTerritory.neighbors) {
          const neighbor = territoryMap.get(neighborId);

          if (
            neighbor &&
            neighbor.owner === player &&
            !visited.has(neighbor.id)
          ) {
            visited.add(neighbor.id);
            queue.push(neighbor.id);
          }
        }
      }
    }

    if (currentClusterSize > maxConnected) {
      maxConnected = currentClusterSize;
    }
  }

  return maxConnected;
}
