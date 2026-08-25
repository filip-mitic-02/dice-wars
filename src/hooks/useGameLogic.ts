import { useState } from "react";
import type { Territory, Player } from "../data/territories";
import { SERBIA_TERRITORIES } from "../data/maps/serbia";
import { generateInitialMap } from "../helperFunctions/mapGenerators";
import { rollDice } from "../helperFunctions/rollDice";
import { distributeEndOfRoundDice } from "../helperFunctions/distributeEndOfRoundDice";

export function useGameLogic() {
  const [gameState, setGameState] = useState<"menu" | "playing">("menu");
  const [gameTerritories, setGameTerritories] = useState<Territory[]>([]);

  const [players, setPlayers] = useState<Player[]>([]);
  const [eliminatedPlayers, setEliminatedPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [round, setRound] = useState<number>(1);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const [battleResult, setBattleResult] = useState<{
    isOpen: boolean;
    attacker: Player;
    defender: Player;
    attackerRoll: number;
    defenderRoll: number;
    attackerDiceCount: number;
    defenderDiceCount: number;
    hasWon: boolean;
    pendingTerritories: Territory[];
  }>({
    isOpen: false,
    attacker: "player1",
    defender: "player2",
    attackerRoll: 0,
    defenderRoll: 0,
    attackerDiceCount: 0,
    defenderDiceCount: 0,
    hasWon: false,
    pendingTerritories: [],
  });

  const currentPlayer = players[currentPlayerIndex];

  const handleStartGame = (playerCount: number) => {
    const activePlayers: Player[] = Array.from(
      { length: playerCount },
      (_, i) => `player${i + 1}` as Player,
    );

    const initialMap = generateInitialMap(SERBIA_TERRITORIES, playerCount);

    setPlayers(activePlayers);
    setEliminatedPlayers([]);
    setCurrentPlayerIndex(0);
    setRound(1);
    setWinner(null);
    setGameTerritories(initialMap);
    setGameState("playing");
  };

  const handleAttack = (attackerId: string, defenderId: string) => {
    const attacker = gameTerritories.find((t) => t.id === attackerId);
    const defender = gameTerritories.find((t) => t.id === defenderId);

    if (!attacker || !defender || attacker.dice <= 1) return;

    const attackerRoll = rollDice(attacker.dice);
    const defenderRoll = rollDice(defender.dice);
    const hasWon = attackerRoll > defenderRoll;

    const nextTerritories = gameTerritories.map((territory) => {
      if (hasWon) {
        if (territory.id === attackerId) return { ...territory, dice: 1 };
        if (territory.id === defenderId) {
          return {
            ...territory,
            owner: attacker.owner,
            dice: attacker.dice - 1,
          };
        }
      } else {
        if (territory.id === attackerId) return { ...territory, dice: 1 };
      }
      return territory;
    });

    setBattleResult({
      isOpen: true,
      attacker: attacker.owner,
      defender: defender.owner,
      attackerRoll,
      defenderRoll,
      attackerDiceCount: attacker.dice,
      defenderDiceCount: defender.dice,
      hasWon,
      pendingTerritories: nextTerritories,
    });
  };

  const handleCloseBattleModal = () => {
    const updatedTerritories = battleResult.pendingTerritories;
    setGameTerritories(updatedTerritories);
    setBattleResult((prev) => ({ ...prev, isOpen: false }));

    const activePlayers = players.filter((p) =>
      updatedTerritories.some((t) => t.owner === p),
    );

    const newlyEliminated = players.filter(
      (p) => !activePlayers.includes(p) && !eliminatedPlayers.includes(p),
    );

    if (newlyEliminated.length > 0) {
      setEliminatedPlayers((prev) => [...prev, ...newlyEliminated]);
    }

    if (activePlayers.length === 1) {
      setWinner(activePlayers[0]);
    }
  };

  const handleEndTurn = () => {
    const activePlayers = players.filter((p) => !eliminatedPlayers.includes(p));

    if (activePlayers.length <= 1) return;

    let nextIndex = (currentPlayerIndex + 1) % players.length;

    while (eliminatedPlayers.includes(players[nextIndex])) {
      nextIndex = (nextIndex + 1) % players.length;
    }

    if (nextIndex <= currentPlayerIndex) {
      setRound((prev) => prev + 1);
      setGameTerritories((prevTerritories) =>
        distributeEndOfRoundDice(prevTerritories, activePlayers),
      );
    }

    setCurrentPlayerIndex(nextIndex);
  };

  const confirmExit = () => {
    setIsModalOpen(false);
    setGameState("menu");
  };

  const handleReturnToMenu = () => {
    setGameState("menu");
    setWinner(null);
  };

  return {
    gameState,
    gameTerritories,
    players,
    eliminatedPlayers,
    currentPlayer,
    round,
    isModalOpen,
    winner,
    battleResult,
    setIsModalOpen,
    handleStartGame,
    handleAttack,
    handleCloseBattleModal,
    handleEndTurn,
    confirmExit,
    handleReturnToMenu,
  };
}
