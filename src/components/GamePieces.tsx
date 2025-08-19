import React from 'react';
import { PlacedPiece } from '../types/GameTypes';
import { PuzzleLevels } from './PuzzleLevels';

interface GamePiecesProps {
  gameState: 'menu' | 'playing' | 'paused' | 'complete';
  placedPieces: PlacedPiece[];
  onPieceSelect: (pieceId: string) => void;
}

export const GamePieces: React.FC<GamePiecesProps> = ({
  gameState,
  placedPieces,
  onPieceSelect
}) => {
  const currentLevel = PuzzleLevels[0]; // Default to first level for now
  
  const isPiecePlaced = (pieceId: string) => {
    return placedPieces.some(piece => piece.pieceId === pieceId);
  };

  const handlePieceClick = (pieceId: string) => {
    if (gameState === 'playing' && !isPiecePlaced(pieceId)) {
      onPieceSelect(pieceId);
    }
  };

  return (
    <div className="digital-panel p-4 rounded-xl h-full">
      <h3 className="digital-text text-lg mb-4 text-center">PEÇAS</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {currentLevel?.pieces.map((piece) => {
          const isPlaced = isPiecePlaced(piece.id);
          const isDisabled = gameState !== 'playing' || isPlaced;
          
          return (
            <div
              key={piece.id}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer
                ${isPlaced 
                  ? 'border-gray-600 bg-gray-800/50 opacity-50' 
                  : 'border-gray-500 bg-gray-700/30 hover:border-cyan-400 hover:bg-cyan-400/10'
                }
                ${!isDisabled ? 'hover:scale-105' : 'cursor-not-allowed'}
              `}
              onClick={() => handlePieceClick(piece.id)}
            >
              {/* Piece Visual Representation */}
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {piece.shape.map((row, y) =>
                  row.map((cell, x) => 
                    cell === 1 ? (
                      <div
                        key={`${x}-${y}`}
                        className={`w-4 h-4 rounded-full game-piece piece-${piece.color}`}
                      />
                    ) : null
                  )
                )}
              </div>
              
              {/* Piece Info */}
              <div className="text-center">
                <div className={`digital-text text-xs ${isPlaced ? 'opacity-50' : ''}`}>
                  {piece.name}
                </div>
                {isPlaced && (
                  <div className="digital-text text-xs text-green-400 mt-1">
                    ✓ COLOCADA
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pieces Status */}
      <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
        <div className="digital-text text-xs text-center">
          {placedPieces.length}/{currentLevel?.pieces.length || 0} Peças Colocadas
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((placedPieces.length / (currentLevel?.pieces.length || 1)) * 100)}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};