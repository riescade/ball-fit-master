import React from 'react';
import { Volume2, VolumeX, Play, Plus, Minus, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  soundEnabled: boolean;
  difficulty: number;
  gameState: 'menu' | 'playing' | 'paused' | 'complete';
  onToggleSound: () => void;
  onStartGame: () => void;
  onIncreaseDifficulty: () => void;
  onDecreaseDifficulty: () => void;
  onResetGame: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  soundEnabled,
  difficulty,
  gameState,
  onToggleSound,
  onStartGame,
  onIncreaseDifficulty,
  onDecreaseDifficulty,
  onResetGame
}) => {
  return (
    <div className="flex justify-center gap-6">
      {/* Sound Toggle - Red Button */}
      <button
        onClick={onToggleSound}
        className="game-button game-button-red flex items-center justify-center"
        title={soundEnabled ? "Desligar Som" : "Ligar Som"}
      >
        {soundEnabled ? (
          <Volume2 className="w-6 h-6 text-white drop-shadow-lg" />
        ) : (
          <VolumeX className="w-6 h-6 text-white drop-shadow-lg" />
        )}
      </button>

      {/* Play/Start - Green Button */}
      <button
        onClick={onStartGame}
        className="game-button game-button-green flex items-center justify-center"
        title="Iniciar Jogo"
      >
        <Play className="w-6 h-6 text-white drop-shadow-lg" />
      </button>

      {/* Decrease Difficulty - Blue Button */}
      <button
        onClick={onDecreaseDifficulty}
        disabled={difficulty <= 1}
        className="game-button game-button-blue flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        title="Diminuir Dificuldade"
      >
        <Minus className="w-6 h-6 text-white drop-shadow-lg" />
      </button>

      {/* Increase Difficulty - Yellow Button */}
      <button
        onClick={onIncreaseDifficulty}
        disabled={difficulty >= 10}
        className="game-button game-button-yellow flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        title="Aumentar Dificuldade"
      >
        <Plus className="w-6 h-6 text-white drop-shadow-lg" />
      </button>

      {/* Reset Game */}
      <button
        onClick={onResetGame}
        className="game-button bg-gray-600 border-gray-400 flex items-center justify-center hover:bg-gray-500"
        title="Reiniciar"
      >
        <RotateCcw className="w-6 h-6 text-white drop-shadow-lg" />
      </button>
    </div>
  );
};