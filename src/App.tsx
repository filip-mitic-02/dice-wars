import GameMap from "./components/GameMap";
import MainMenu from "./components/MainMenu";
import ConfirmModal from "./components/ConfirmModal";
import BattlePanel from "./components/BattlePanel";
import GameSidebar from "./components/GameSidebar";
import { useGameLogic } from "./hooks/useGameLogic";
import GameHeader from "./components/GameHeader";
import WinnerModal from "./components/WinnerModal";

export default function App() {
  const {
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
  } = useGameLogic();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 select-none">
      {gameState === "menu" ? (
        <MainMenu onStartGame={handleStartGame} />
      ) : (
        <div className="flex h-screen w-full bg-slate-900 overflow-hidden">
          <GameSidebar
            territories={gameTerritories}
            players={players}
            currentPlayer={currentPlayer}
            eliminatedPlayers={eliminatedPlayers}
          />

          <main className="flex-1 flex flex-col items-center justify-center p-6 gap-4 relative overflow-hidden">
            <GameHeader
              round={round}
              currentPlayer={currentPlayer}
              onEndTurn={handleEndTurn}
            />

            <div className="relative w-full flex-1 flex items-center justify-center">
              <GameMap
                territories={gameTerritories}
                currentPlayer={currentPlayer}
                disabled={battleResult.isOpen}
                handleEndGame={() => setIsModalOpen(true)}
                onAttack={handleAttack}
              />
            </div>
          </main>

          <BattlePanel
            isOpen={battleResult.isOpen}
            attacker={battleResult.attacker}
            defender={battleResult.defender}
            attackerRoll={battleResult.attackerRoll}
            defenderRoll={battleResult.defenderRoll}
            attackerDiceCount={battleResult.attackerDiceCount}
            defenderDiceCount={battleResult.defenderDiceCount}
            hasWon={battleResult.hasWon}
            onClose={handleCloseBattleModal}
          />
        </div>
      )}

      {winner && (
        <WinnerModal winner={winner} onReturnToMenu={handleReturnToMenu} />
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        title="Napusti igru?"
        message="Da li ste sigurni da želite da izađete u glavni meni? Trenutni napredak će biti izgubljen."
        onConfirm={confirmExit}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
