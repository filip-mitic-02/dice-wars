import type { Player, Territory } from "../data/territories";

export function distributeEndOfRoundDice(
  currentTerritories: Territory[],
  activePlayers: Player[],
): Territory[] {
  const updatedTerritories = currentTerritories.map((t) => ({ ...t }));

  activePlayers.forEach((player) => {
    const playerTerritories = updatedTerritories.filter(
      (t) => t.owner === player,
    );
    let bonusDice = playerTerritories.length;

    while (bonusDice > 0) {
      const validTerritories = playerTerritories.filter((t) => t.dice < 8);
      if (validTerritories.length === 0) break;

      const randomIndex = Math.floor(Math.random() * validTerritories.length);
      validTerritories[randomIndex].dice += 1;
      bonusDice -= 1;
    }
  });

  return updatedTerritories;
}
