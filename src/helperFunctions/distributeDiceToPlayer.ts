import type { Territory, Player } from "../data/territories";

const MAX_DICE_PER_TERRITORY = 8;

export function distributeDiceToPlayer(
  territories: Territory[],
  player: Player,
  diceToAward: number,
): Territory[] {
  if (diceToAward <= 0) return territories;

  const updatedTerritories = [...territories];
  let remainingDice = diceToAward;

  while (remainingDice > 0) {
    const eligibleTerritories = updatedTerritories.filter(
      (t) => t.owner === player && t.dice < MAX_DICE_PER_TERRITORY,
    );

    if (eligibleTerritories.length === 0) break;

    const randomIndex = Math.floor(Math.random() * eligibleTerritories.length);
    const selectedTerritory = eligibleTerritories[randomIndex];

    const territoryIndex = updatedTerritories.findIndex(
      (t) => t.id === selectedTerritory.id,
    );

    updatedTerritories[territoryIndex] = {
      ...updatedTerritories[territoryIndex],
      dice: updatedTerritories[territoryIndex].dice + 1,
    };

    remainingDice--;
  }

  return updatedTerritories;
}
