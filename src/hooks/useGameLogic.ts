import { useState } from "react";
import type { Territory, Player, MapId } from "../data/territories";
import { SERBIA_TERRITORIES } from "../data/maps/serbia";
import { BULGARIA_TERRITORIES } from "../data/maps/bulgaria";
import { generateInitialMap } from "../helperFunctions/mapGenerators";
import { rollDice } from "../helperFunctions/rollDice";
import { distributeDiceToPlayer } from "../helperFunctions/distributeDiceToPlayer";
import { getMaxConnectedTerritories } from "../helperFunctions/getConnectedTerritories";

const MAP_TERRITORIES = {
  serbia: SERBIA_TERRITORIES,
  bulgaria: BULGARIA_TERRITORIES,
};

const initialBattleState = {
  isOpen: false,
  isBattling: false,
  attacker: "player1" as Player,
  defender: "player2" as Player,
  attackerRoll: 0,
  defenderRoll: 0,
  attackerDiceCount: 0,
  defenderDiceCount: 0,
  hasWon: false,
  pendingTerritories: [] as Territory[],
};

export function useGameLogic() {
  const [gameState, setGameState] = useState<"menu" | "mapSelect" | "playing">(
    "menu",
  );
  const [gameTerritories, setGameTerritories] = useState<Territory[]>([]);
  const [mapId, setMapId] = useState<MapId>("serbia");

  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNames, setPlayerNames] = useState<Record<string, string>>({});
  const [eliminatedPlayers, setEliminatedPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [round, setRound] = useState<number>(1);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const [battleResult, setBattleResult] = useState<{
    isOpen: boolean;
    isBattling: boolean;
    attacker: Player;
    defender: Player;
    attackerRoll: number;
    defenderRoll: number;
    attackerDiceCount: number;
    defenderDiceCount: number;
    hasWon: boolean;
    pendingTerritories: Territory[];
  }>(initialBattleState);

  const currentPlayer = players[currentPlayerIndex];

  const handleStartGame = (
    playerCount: number,
    namesMap: Record<string, string>,
  ) => {
    setBattleResult(initialBattleState);

    const activePlayers: Player[] = Array.from(
      { length: playerCount },
      (_, i) => `player${i + 1}` as Player,
    );

    setPlayers(activePlayers);
    setPlayerNames(namesMap);
    setEliminatedPlayers([]);
    setCurrentPlayerIndex(0);
    setRound(1);
    setWinner(null);
    setGameState("mapSelect");
  };

  const handleSelectMap = (selectedMapId: MapId) => {
    const initialMap = generateInitialMap(
      MAP_TERRITORIES[selectedMapId],
      players.length,
    );

    setMapId(selectedMapId);
    setGameTerritories(initialMap);
    setGameState("playing");
  };

  const handleCancelMapSelect = () => {
    setGameState("menu");
  };

  const getPlayerName = (player: Player | string): string => {
    return playerNames[player] || player;
  };

  const handleAttack = (attackerId: string, defenderId: string) => {
    if (battleResult.isBattling) return;

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
      isBattling: true,
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
    if (updatedTerritories.length > 0) {
      setGameTerritories(updatedTerritories);
    }

    setBattleResult((prev) => ({
      ...prev,
      isBattling: false,
    }));

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

    const maxConnected = getMaxConnectedTerritories(
      gameTerritories,
      currentPlayer,
    );

    const diceToAward = maxConnected;

    const updatedTerritories = distributeDiceToPlayer(
      gameTerritories,
      currentPlayer,
      diceToAward,
    );

    let nextIndex = (currentPlayerIndex + 1) % players.length;

    while (eliminatedPlayers.includes(players[nextIndex])) {
      nextIndex = (nextIndex + 1) % players.length;
    }

    if (nextIndex <= currentPlayerIndex) {
      setRound((prev) => prev + 1);
    }

    setGameTerritories(updatedTerritories);
    setCurrentPlayerIndex(nextIndex);
  };

  const confirmExit = () => {
    setBattleResult(initialBattleState);
    setIsModalOpen(false);
    setGameState("menu");
  };

  const handleReturnToMenu = () => {
    setBattleResult(initialBattleState);
    setGameState("menu");
    setWinner(null);
  };

  return {
    gameState,
    gameTerritories,
    mapId,
    players,
    playerNames,
    getPlayerName,
    eliminatedPlayers,
    currentPlayer,
    round,
    isModalOpen,
    winner,
    battleResult,
    setIsModalOpen,
    handleStartGame,
    handleSelectMap,
    handleCancelMapSelect,
    handleAttack,
    handleCloseBattleModal,
    handleEndTurn,
    confirmExit,
    handleReturnToMenu,
  };
}
