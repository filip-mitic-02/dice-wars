import type { BaseTerritory, Player, Territory } from "../data/territories";

export function generateInitialMap(
  baseTerritories: BaseTerritory[],
  playerCount: number,
  totalDiceOnMap = 75,
): Territory[] {
  const players: Player[] = Array.from(
    { length: playerCount },
    (_, i) => `player${i + 1}` as Player,
  );

  const shuffled = [...baseTerritories].sort(() => Math.random() - 0.5);
  const territoriesWithOwners: Territory[] = shuffled.map(
    (territory, index) => ({
      ...territory,
      owner: players[index % playerCount],
      dice: 1,
    }),
  );

  const dicePerPlayer = Math.floor(totalDiceOnMap / playerCount);

  players.forEach((player) => {
    const playerTerritories = territoriesWithOwners.filter(
      (t) => t.owner === player,
    );

    let remainingDice = dicePerPlayer - playerTerritories.length;

    while (remainingDice > 0) {
      const validTerritories = playerTerritories.filter((t) => t.dice < 8);

      if (validTerritories.length === 0) break;

      const randomIndex = Math.floor(Math.random() * validTerritories.length);
      validTerritories[randomIndex].dice += 1;
      remainingDice -= 1;
    }
  });

  return territoriesWithOwners;
}
