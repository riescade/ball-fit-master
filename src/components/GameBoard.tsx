import React, { useState, useCallback } from 'react';
import { PuzzleLevel, PlacedPiece } from '../types/GameTypes';

interface GameBoardProps {
  level: PuzzleLevel;
  placedPieces: PlacedPiece[];
  gameState: 'menu' | 'playing' | 'paused' | 'complete';
  onPiecePlace: (pieceId: string, position: { x: number; y: number }) => void;
  onPieceRemove: (pieceId: string) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  level,
  placedPieces,
  gameState,
  onPiecePlace,
  onPieceRemove
}) => {
  const [draggedPiece, setDraggedPiece] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  const handleCellClick = useCallback((x: number, y: number) => {
    if (gameState !== 'playing') return;

    // Check if there's a piece at this position
    const pieceAtPosition = placedPieces.find(
      piece => piece.position.x === x && piece.position.y === y
    );

    if (pieceAtPosition) {
      onPieceRemove(pieceAtPosition.pieceId);
    } else if (draggedPiece) {
      onPiecePlace(draggedPiece, { x, y });
      setDraggedPiece(null);
    }
  }, [gameState, placedPieces, draggedPiece, onPiecePlace, onPieceRemove]);

  const handleCellMouseEnter = useCallback((x: number, y: number) => {
    setHoverPosition({ x, y });
  }, []);

  const handleCellMouseLeave = useCallback(() => {
    setHoverPosition(null);
  }, []);

  const isPieceAtPosition = useCallback((x: number, y: number) => {
    return placedPieces.some(piece => piece.position.x === x && piece.position.y === y);
  }, [placedPieces]);

  const getPieceColorAtPosition = useCallback((x: number, y: number) => {
    const piece = placedPieces.find(piece => piece.position.x === x && piece.position.y === y);
    return piece?.color || 'gray';
  }, [placedPieces]);

  if (!level) {
    return (
      <div className="game-board p-8 rounded-2xl flex items-center justify-center">
        <div className="digital-text text-xl">Carregando nível...</div>
      </div>
    );
  }

  return (
    <div className="game-board p-8 rounded-2xl">
      <div 
        className="grid gap-2"
        style={{ 
          gridTemplateColumns: `repeat(${level.boardSize.width}, 1fr)`,
          gridTemplateRows: `repeat(${level.boardSize.height}, 1fr)`
        }}
      >
        {Array.from({ length: level.boardSize.height }, (_, y) =>
          Array.from({ length: level.boardSize.width }, (_, x) => {
            const hasPiece = isPieceAtPosition(x, y);
            const pieceColor = getPieceColorAtPosition(x, y);
            const isHovered = hoverPosition?.x === x && hoverPosition?.y === y;
            
            return (
              <div
                key={`${x}-${y}`}
                className={`
                  w-12 h-12 rounded-full cursor-pointer transition-all duration-200
                  ${hasPiece 
                    ? `game-piece piece-${pieceColor} snap-effect` 
                    : 'board-hole hover:scale-110'
                  }
                  ${isHovered && !hasPiece ? 'ring-2 ring-cyan-400 ring-opacity-60' : ''}
                  ${draggedPiece && !hasPiece ? 'hover:bg-cyan-400/20' : ''}
                `}
                onClick={() => handleCellClick(x, y)}
                onMouseEnter={() => handleCellMouseEnter(x, y)}
                onMouseLeave={handleCellMouseLeave}
                title={`Posição (${x}, ${y})`}
              />
            );
          })
        )}
      </div>

      {/* Board Info */}
      <div className="mt-4 text-center">
        <div className="digital-text text-sm opacity-60">
          {level.boardSize.width} × {level.boardSize.height} • {placedPieces.length}/{level.pieces.length} peças
        </div>
      </div>
    </div>
  );
};