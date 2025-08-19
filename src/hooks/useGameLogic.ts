import { useState, useEffect, useCallback } from 'react';
import { GameState, PlacedPiece } from '../types/GameTypes';
import { PuzzleLevels } from '../components/PuzzleLevels';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    state: 'menu',
    score: 0,
    timeElapsed: 0,
    soundEnabled: true,
    difficulty: 1,
    placedPieces: [],
    isComplete: false
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (gameState.state === 'playing') {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
      setTimer(interval);
    } else {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState.state]);

  // Check completion
  useEffect(() => {
    if (gameState.state === 'playing') {
      const currentLevel = PuzzleLevels[gameState.currentLevel];
      if (currentLevel && gameState.placedPieces.length === currentLevel.pieces.length) {
        // Check if all pieces are correctly placed (simplified check)
        const isComplete = gameState.placedPieces.length > 0;
        if (isComplete) {
          setGameState(prev => ({
            ...prev,
            state: 'complete',
            isComplete: true,
            score: prev.score + (1000 - prev.timeElapsed * 10) + (prev.difficulty * 100)
          }));
        }
      }
    }
  }, [gameState.placedPieces, gameState.state, gameState.currentLevel, gameState.timeElapsed, gameState.difficulty]);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      state: 'playing',
      timeElapsed: 0,
      placedPieces: [],
      isComplete: false
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      state: 'menu',
      timeElapsed: 0,
      placedPieces: [],
      isComplete: false
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  }, []);

  const increaseDifficulty = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      difficulty: Math.min(10, prev.difficulty + 1),
      currentLevel: Math.min(PuzzleLevels.length - 1, prev.currentLevel + 1)
    }));
  }, []);

  const decreaseDifficulty = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      difficulty: Math.max(1, prev.difficulty - 1),
      currentLevel: Math.max(0, prev.currentLevel - 1)
    }));
  }, []);

  const placePiece = useCallback((pieceId: string, position: { x: number; y: number }): boolean => {
    const currentLevel = PuzzleLevels[gameState.currentLevel];
    if (!currentLevel) return false;

    const piece = currentLevel.pieces.find(p => p.id === pieceId);
    if (!piece) return false;

    // Check if piece is already placed
    const isAlreadyPlaced = gameState.placedPieces.some(p => p.pieceId === pieceId);
    if (isAlreadyPlaced) return false;

    // Check if position is valid (simplified - just check bounds)
    if (position.x < 0 || position.x >= currentLevel.boardSize.width ||
        position.y < 0 || position.y >= currentLevel.boardSize.height) {
      return false;
    }

    // Check if position is occupied
    const isOccupied = gameState.placedPieces.some(p => 
      p.position.x === position.x && p.position.y === position.y
    );
    if (isOccupied) return false;

    // Place the piece
    const newPlacedPiece: PlacedPiece = {
      pieceId,
      position,
      rotation: 0,
      color: piece.color
    };

    setGameState(prev => ({
      ...prev,
      placedPieces: [...prev.placedPieces, newPlacedPiece]
    }));

    return true;
  }, [gameState.currentLevel, gameState.placedPieces]);

  const removePiece = useCallback((pieceId: string) => {
    setGameState(prev => ({
      ...prev,
      placedPieces: prev.placedPieces.filter(p => p.pieceId !== pieceId)
    }));
  }, []);

  return {
    currentLevel: gameState.currentLevel,
    gameState: gameState.state,
    score: gameState.score,
    timeElapsed: gameState.timeElapsed,
    soundEnabled: gameState.soundEnabled,
    difficulty: gameState.difficulty,
    placedPieces: gameState.placedPieces,
    isComplete: gameState.isComplete,
    startGame,
    resetGame,
    increaseDifficulty,
    decreaseDifficulty,
    toggleSound,
    placePiece,
    removePiece
  };
};