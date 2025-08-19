export interface GamePiece {
  id: string;
  name: string;
  color: string;
  shape: number[][]; // 2D array representing the piece shape (1 = filled, 0 = empty)
}

export interface PlacedPiece {
  pieceId: string;
  position: { x: number; y: number };
  rotation: number; // 0, 90, 180, 270 degrees
  color: string;
}

export interface PuzzleLevel {
  id: number;
  name: string;
  difficulty: number;
  boardSize: { width: number; height: number };
  pieces: GamePiece[];
  preplacedPieces?: PlacedPiece[]; // Some pieces might be pre-placed
}

export interface GameState {
  currentLevel: number;
  state: 'menu' | 'playing' | 'paused' | 'complete';
  score: number;
  timeElapsed: number;
  soundEnabled: boolean;
  difficulty: number;
  placedPieces: PlacedPiece[];
  isComplete: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface BoardDimensions {
  width: number;
  height: number;
}