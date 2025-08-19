import React, { useState, useCallback } from 'react';
import { PuzzleLevel, PlacedPiece } from '../types/GameTypes';

interface GameBoardProps {
  level: PuzzleLevel;
  placedPieces: PlacedPiece[];
  gameState: 'menu' | 'playing' | 'paused' | 'complete';
  onPiecePlace: (pieceId: string, position: { x: number; y: number }, rotation?: number) => void;
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
  const [dragOverPosition, setDragOverPosition] = useState<{ x: number; y: number } | null>(null);

  const handleCellClick = useCallback((x: number, y: number) => {
    if (gameState !== 'playing') return;

    // Check if there's a piece at this position
    const pieceAtPosition = placedPieces.find(
      piece => piece.position.x === x && piece.position.y === y
    );

    if (pieceAtPosition) {
      onPieceRemove(pieceAtPosition.pieceId);
    }
  }, [gameState, placedPieces, onPieceRemove]);

  const handleCellMouseEnter = useCallback((x: number, y: number) => {
    setHoverPosition({ x, y });
  }, []);

  const handleCellMouseLeave = useCallback(() => {
    setHoverPosition(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, x: number, y: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverPosition({ x, y });
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverPosition(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, x: number, y: number) => {
    e.preventDefault();
    setDragOverPosition(null);

    if (gameState !== 'playing') return;

    try {
      const data = e.dataTransfer.getData('text/plain');
      const pieceData = JSON.parse(data);
      
      console.log('Dropping piece:', pieceData, 'at position:', { x, y });
      const success = onPiecePlace(pieceData.pieceId, { x, y }, pieceData.rotation || 0);
      console.log('Drop success:', success);
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  }, [gameState, onPiecePlace]);

  const isPieceAtPosition = useCallback((x: number, y: number) => {
    // Check if any part of any placed piece occupies this position
    return placedPieces.some(piece => {
      // For now, simplified - each piece only occupies its center position
      // In a more complex implementation, we'd calculate all positions based on shape
      return piece.position.x === x && piece.position.y === y;
    });
  }, [placedPieces]);

  const getPieceColorAtPosition = useCallback((x: number, y: number) => {
    const piece = placedPieces.find(piece => 
      piece.position.x === x && piece.position.y === y
    );
    return piece?.color || 'gray';
  }, [placedPieces]);

  const canPlacePieceAt = useCallback((x: number, y: number) => {
    // Simple check - just see if the exact position is free
    return !isPieceAtPosition(x, y);
  }, [isPieceAtPosition]);

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
            const isDragOver = dragOverPosition?.x === x && dragOverPosition?.y === y;
            
            return (
              <div
                key={`${x}-${y}`}
                className={`
                  w-12 h-12 rounded-full cursor-pointer transition-all duration-200 relative
                  ${hasPiece 
                    ? `game-piece piece-${pieceColor} snap-effect hover:scale-110` 
                    : 'board-hole hover:scale-110'
                  }
                  ${isHovered && !hasPiece ? 'ring-2 ring-cyan-400 ring-opacity-60' : ''}
                  ${isDragOver && !hasPiece ? 'ring-4 ring-green-400 ring-opacity-80 scale-110 bg-green-400/20' : ''}
                  ${gameState === 'playing' && !hasPiece ? 'hover:bg-cyan-400/10' : ''}
                `}
                onClick={() => handleCellClick(x, y)}
                onMouseEnter={() => handleCellMouseEnter(x, y)}
                onMouseLeave={handleCellMouseLeave}
                onDragOver={(e) => handleDragOver(e, x, y)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, x, y)}
                title={hasPiece ? `Clique para remover peça em (${x}, ${y})` : `Posição (${x}, ${y})`}
              >
                {/* Visual feedback for drop zones */}
                {isDragOver && !hasPiece && (
                  <div className="absolute inset-0 rounded-full border-4 border-green-400 border-dashed animate-pulse" />
                )}
                
                {/* Piece removal indicator */}
                {hasPiece && isHovered && (
                  <div className="absolute inset-0 bg-red-500/20 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs font-bold">✕</div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Board Info */}
      <div className="mt-4 text-center">
        <div className="digital-text text-sm opacity-60">
          {level.boardSize.width} × {level.boardSize.height} • {placedPieces.length}/{level.pieces.length} peças
        </div>
        
        {gameState === 'playing' && (
          <div className="digital-text text-xs opacity-40 mt-2">
            Arraste peças aqui • Clique nas peças colocadas para remover
          </div>
        )}
      </div>

      {/* Drop feedback overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {dragOverPosition && (
          <div className="absolute inset-0 bg-green-400/5 border-2 border-green-400/30 border-dashed rounded-2xl animate-pulse" />
        )}
      </div>
    </div>
  );
};