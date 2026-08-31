import type { BaseTerritory, Player, Territory } from "../data/territories";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function countNeighborConflicts(
  candidate: BaseTerritory,
  playerTerritoryIds: string[],
): number {
  return candidate.neighbors.reduce((count, neighborId) => {
    return playerTerritoryIds.includes(neighborId) ? count + 1 : count;
  }, 0);
}

export function generateInitialMap(
  baseTerritories: BaseTerritory[],
  playerCount: number,
  totalDiceOnMap = 75,
): Territory[] {
  const players: Player[] = Array.from(
    { length: playerCount },
    (_, i) => `player${i + 1}` as Player,
  );

  const totalTerritories = baseTerritories.length;
  const territoriesPerPlayer = Math.floor(totalTerritories / playerCount);

  let available = shuffle(baseTerritories);
  const assignments: Record<string, Player> = {};

  const playerTerritoriesMap: Record<Player, string[]> = {
    player1: [],
    player2: [],
    player3: [],
    player4: [],
    player5: [],
    player6: [],
  };

  for (let pIdx = 0; pIdx < players.length; pIdx++) {
    const player = players[pIdx];
    const ownedIds = playerTerritoriesMap[player];

    const isSeekingClustered = pIdx > (players.length - 1) / 2;

    for (let i = 0; i < territoriesPerPlayer; i++) {
      if (available.length === 0) break;

      if (ownedIds.length === 0) {
        const chosen = available.pop()!;
        assignments[chosen.id] = player;
        ownedIds.push(chosen.id);
      } else {
        const scoredCandidates = available.map((territory) => ({
          territory,
          conflicts: countNeighborConflicts(territory, ownedIds),
        }));

        let targetConflicts: number;

        if (!isSeekingClustered) {
          targetConflicts = Math.min(
            ...scoredCandidates.map((c) => c.conflicts),
          );
        } else {
          targetConflicts = Math.max(
            ...scoredCandidates.map((c) => c.conflicts),
          );
        }

        const bestCandidates = scoredCandidates
          .filter((c) => c.conflicts === targetConflicts)
          .map((c) => c.territory);

        const chosen = shuffle(bestCandidates)[0];

        available = available.filter((t) => t.id !== chosen.id);

        assignments[chosen.id] = player;
        ownedIds.push(chosen.id);
      }
    }
  }

  let extraPlayerIndex = 0;
  for (const extraTerritory of available) {
    const assignedPlayer = players[extraPlayerIndex % players.length];
    assignments[extraTerritory.id] = assignedPlayer;
    extraPlayerIndex++;
  }

  const territoriesWithOwners: Territory[] = baseTerritories.map((base) => ({
    ...base,
    owner: assignments[base.id],
    dice: 1,
  }));

  const dicePerPlayer = Math.floor(totalDiceOnMap / playerCount);

  players.forEach((player) => {
    const playerTerritories = territoriesWithOwners.filter(
      (t) => t.owner === player,
    );

    let remainingDice = dicePerPlayer - playerTerritories.length;

    while (remainingDice > 0) {
      const validTerritories = playerTerritories.filter((t) => t.dice < 8);

      if (validTerritories.length === 0) break;

      const territory =
        validTerritories[Math.floor(Math.random() * validTerritories.length)];
      const maxAddable = Math.min(remainingDice, 8 - territory.dice);
      const amount = 1 + Math.floor(Math.random() * maxAddable);

      territory.dice += amount;
      remainingDice -= amount;
    }
  });

  return territoriesWithOwners;
}
