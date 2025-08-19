import React, { useState, useEffect, useCallback } from 'react';
import { DigitalPanel } from './DigitalPanel';
import { GameControls } from './GameControls';
import { GameBoard } from './GameBoard';
import { GamePieces } from './GamePieces';
import { PuzzleLevels } from './PuzzleLevels';
import { useGameLogic } from '../hooks/useGameLogic';
import { toast } from 'sonner';

export const KanoodleGame = () => {
  const {
    currentLevel,
    gameState,
    score,
    timeElapsed,
    soundEnabled,
    difficulty,
    placedPieces,
    isComplete,
    startGame,
    resetGame,
    increaseDifficulty,
    decreaseDifficulty,
    toggleSound,
    placePiece,
    removePiece
  } = useGameLogic();

  const handlePiecePlace = useCallback((pieceId: string, position: { x: number; y: number }) => {
    const success = placePiece(pieceId, position);
    if (success) {
      if (soundEnabled) {
        // Play snap sound effect
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp6KNRFQxOquLvullCAjuLz/LNeSsFJoPI8tyEOggYYqzn56ZUGQtNn+H0sm4QDE6o4O6xaxkFWKnn5ptaGgxYq+Pqr3Mdj8fy3JInByhvxfDcjzYIF2m//O9bGgxPk+D0smABDk2o4O6xaxkFWKnn5ptaGAzs8ds=');
        audio.volume = 0.3;
        audio.play().catch(() => {}); // Ignore audio errors
      }
      toast.success('Peça encaixada!');
    } else {
      toast.error('Posição inválida!');
    }
  }, [placePiece, soundEnabled]);

  const handleStartGame = useCallback(() => {
    startGame();
    toast.success(`Desafio ${currentLevel + 1} iniciado!`);
  }, [startGame, currentLevel]);

  useEffect(() => {
    if (isComplete) {
      toast.success(`Parabéns! Nível ${currentLevel + 1} completo em ${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}!`);
    }
  }, [isComplete, currentLevel, timeElapsed]);

  return (
    <div className="min-h-screen bg-background flex flex-col p-4 gap-6">
      {/* Digital Panel */}
      <DigitalPanel 
        timeElapsed={timeElapsed}
        score={score}
        level={currentLevel + 1}
        difficulty={difficulty}
        isPlaying={gameState === 'playing'}
      />

      {/* Game Controls */}
      <GameControls
        soundEnabled={soundEnabled}
        difficulty={difficulty}
        gameState={gameState}
        onToggleSound={toggleSound}
        onStartGame={handleStartGame}
        onIncreaseDifficulty={increaseDifficulty}
        onDecreaseDifficulty={decreaseDifficulty}
        onResetGame={resetGame}
      />

      {/* Main Game Area */}
      <div className="flex-1 flex gap-6">
        {/* Game Pieces Panel */}
        <div className="w-1/4 min-w-[250px]">
          <GamePieces
            gameState={gameState}
            placedPieces={placedPieces}
            onPieceSelect={(pieceId) => console.log('Selected piece:', pieceId)}
          />
        </div>

        {/* Game Board */}
        <div className="flex-1 flex items-center justify-center">
          <GameBoard
            level={PuzzleLevels[currentLevel]}
            placedPieces={placedPieces}
            gameState={gameState}
            onPiecePlace={handlePiecePlace}
            onPieceRemove={removePiece}
          />
        </div>

        {/* Level Info Panel */}
        <div className="w-1/4 min-w-[200px] digital-panel p-4 rounded-xl">
          <h3 className="digital-text text-lg mb-4">NÍVEL {currentLevel + 1}</h3>
          <div className="space-y-2 text-sm digital-text">
            <div>Dificuldade: {difficulty}</div>
            <div>Peças: {PuzzleLevels[currentLevel]?.pieces.length || 0}</div>
            <div>Objetivo: Preencher todo o tabuleiro</div>
          </div>
          
          {isComplete && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <div className="digital-text text-green-400 text-center">
                ✓ COMPLETO!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};