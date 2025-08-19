import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GamePiece, PlacedPiece } from '../types/GameTypes';
import { PuzzleLevels } from './PuzzleLevels';

interface DraggablePieceProps {
  piece: GamePiece;
  isPlaced: boolean;
  gameState: 'menu' | 'playing' | 'paused' | 'complete';
  onDragStart: (pieceId: string) => void;
  onDragEnd: () => void;
}

const DraggablePiece: React.FC<DraggablePieceProps> = ({
  piece,
  isPlaced,
  gameState,
  onDragStart,
  onDragEnd
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    if (gameState !== 'playing' || isPlaced) {
      e.preventDefault();
      return;
    }

    setIsDragging(true);
    onDragStart(piece.id);
    
    // Store piece data for drop handling
    e.dataTransfer.setData('text/plain', JSON.stringify({
      pieceId: piece.id,
      shape: piece.shape,
      color: piece.color,
      rotation: rotation
    }));
    
    e.dataTransfer.effectAllowed = 'move';
  }, [gameState, isPlaced, onDragStart, piece, rotation]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    onDragEnd();
  }, [onDragEnd]);

  const handleRotate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameState === 'playing' && !isPlaced) {
      setRotation(prev => (prev + 90) % 360);
    }
  }, [gameState, isPlaced]);

  const getRotatedShape = useCallback(() => {
    let shape = piece.shape;
    for (let i = 0; i < rotation / 90; i++) {
      // Rotate shape 90 degrees clockwise
      const rows = shape.length;
      const cols = shape[0].length;
      const rotated: number[][] = [];
      
      for (let j = 0; j < cols; j++) {
        rotated[j] = [];
        for (let k = 0; k < rows; k++) {
          rotated[j][k] = shape[rows - 1 - k][j];
        }
      }
      shape = rotated;
    }
    return shape;
  }, [piece.shape, rotation]);

  const isDisabled = gameState !== 'playing' || isPlaced;
  const displayShape = getRotatedShape();

  return (
    <div
      ref={elementRef}
      className={`
        p-3 rounded-lg border-2 transition-all duration-200 select-none
        ${isPlaced 
          ? 'border-gray-600 bg-gray-800/50 opacity-50' 
          : 'border-gray-500 bg-gray-700/30 hover:border-cyan-400 hover:bg-cyan-400/10'
        }
        ${!isDisabled ? 'cursor-grab hover:scale-105' : 'cursor-not-allowed'}
        ${isDragging ? 'opacity-50 scale-110 cursor-grabbing' : ''}
      `}
      draggable={!isDisabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      title={isDisabled ? undefined : 'Arraste para o tabuleiro. Clique com botão direito para rotacionar.'}
      onContextMenu={(e) => {
        e.preventDefault();
        handleRotate(e);
      }}
    >
      {/* Piece Visual Representation */}
      <div className="flex flex-col items-center gap-1 mb-2">
        {displayShape.map((row, y) => (
          <div key={y} className="flex gap-1">
            {row.map((cell, x) => 
              cell === 1 ? (
                <div
                  key={`${x}-${y}`}
                  className={`
                    w-5 h-5 rounded-full border-2 transition-all duration-200
                    ${isPlaced 
                      ? `piece-${piece.color} opacity-100`
                      : 'bg-gray-400 border-gray-300 opacity-60'
                    }
                    ${isDragging ? 'animate-pulse' : ''}
                  `}
                />
              ) : (
                <div key={`${x}-${y}`} className="w-5 h-5" />
              )
            )}
          </div>
        ))}
      </div>
      
      {/* Piece Info */}
      <div className="text-center">
        <div className={`digital-text text-xs ${isPlaced ? 'opacity-50' : ''}`}>
          {piece.name}
        </div>
        {rotation > 0 && !isPlaced && (
          <div className="digital-text text-xs text-cyan-400 mt-1">
            {rotation}°
          </div>
        )}
        {isPlaced && (
          <div className="digital-text text-xs text-green-400 mt-1">
            ✓ COLOCADA
          </div>
        )}
      </div>

      {/* Rotation indicator */}
      {!isPlaced && !isDisabled && (
        <div className="text-center mt-2">
          <div className="digital-text text-xs opacity-40">
            Botão direito: rotar
          </div>
        </div>
      )}
    </div>
  );
};

interface GamePiecesProps {
  gameState: 'menu' | 'playing' | 'paused' | 'complete';
  placedPieces: PlacedPiece[];
  currentLevel: number;
  onPieceSelect: (pieceId: string) => void;
  onDragStart: (pieceId: string) => void;
  onDragEnd: () => void;
}

export const GamePieces: React.FC<GamePiecesProps> = ({
  gameState,
  placedPieces,
  currentLevel,
  onPieceSelect,
  onDragStart,
  onDragEnd
}) => {
  const level = PuzzleLevels[currentLevel];
  
  const isPiecePlaced = (pieceId: string) => {
    return placedPieces.some(piece => piece.pieceId === pieceId);
  };

  const handlePieceClick = (pieceId: string) => {
    if (gameState === 'playing' && !isPiecePlaced(pieceId)) {
      onPieceSelect(pieceId);
    }
  };

  if (!level) {
    return (
      <div className="digital-panel p-4 rounded-xl h-full flex items-center justify-center">
        <div className="digital-text">Carregando peças...</div>
      </div>
    );
  }

  return (
    <div className="digital-panel p-4 rounded-xl h-full">
      <h3 className="digital-text text-lg mb-4 text-center">PEÇAS</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {level.pieces.map((piece) => {
          const isPlaced = isPiecePlaced(piece.id);
          
          return (
            <DraggablePiece
              key={piece.id}
              piece={piece}
              isPlaced={isPlaced}
              gameState={gameState}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          );
        })}
      </div>

      {/* Pieces Status */}
      <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
        <div className="digital-text text-xs text-center">
          {placedPieces.length}/{level.pieces.length} Peças Colocadas
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((placedPieces.length / level.pieces.length) * 100)}%` 
            }}
          />
        </div>
      </div>

      {/* Instructions */}
      {gameState === 'playing' && (
        <div className="mt-4 p-2 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
          <div className="digital-text text-xs text-cyan-400 text-center">
            Arraste as peças para o tabuleiro
          </div>
        </div>
      )}
    </div>
  );
};