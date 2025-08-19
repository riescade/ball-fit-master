import { PuzzleLevel } from '../types/GameTypes';

export const PuzzleLevels: PuzzleLevel[] = [
  {
    id: 1,
    name: "Iniciante 1",
    difficulty: 1,
    boardSize: { width: 12, height: 8 },
    pieces: [
      {
        id: "piece-1",
        name: "Linha 3",
        color: "red",
        shape: [
          [1, 1, 1]
        ]
      },
      {
        id: "piece-2", 
        name: "Linha 4",
        color: "blue",
        shape: [
          [1, 1, 1, 1]
        ]
      },
      {
        id: "piece-3",
        name: "L Pequeno",
        color: "green", 
        shape: [
          [1, 0],
          [1, 1]
        ]
      },
      {
        id: "piece-4",
        name: "Quadrado",
        color: "yellow",
        shape: [
          [1, 1],
          [1, 1]
        ]
      },
      {
        id: "piece-5",
        name: "Z",
        color: "orange",
        shape: [
          [1, 1, 0],
          [0, 1, 1]
        ]
      },
      {
        id: "piece-6",
        name: "T",
        color: "cyan",
        shape: [
          [1, 1, 1],
          [0, 1, 0]
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Intermediário",
    difficulty: 2,
    boardSize: { width: 12, height: 8 },
    pieces: [
      {
        id: "piece-7",
        name: "L Grande",
        color: "cyan",
        shape: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 1]
        ]
      },
      {
        id: "piece-8",
        name: "Linha 5",
        color: "pink",
        shape: [
          [1, 1, 1, 1, 1]
        ]
      },
      {
        id: "piece-9",
        name: "P",
        color: "white",
        shape: [
          [1, 1],
          [1, 1],
          [1, 0]
        ]
      },
      {
        id: "piece-10",
        name: "S",
        color: "gray",
        shape: [
          [0, 1, 1],
          [1, 1, 0]
        ]
      },
      {
        id: "piece-11",
        name: "Cruz",
        color: "red",
        shape: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ]
      },
      {
        id: "piece-12",
        name: "U",
        color: "blue",
        shape: [
          [1, 0, 1],
          [1, 1, 1]
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Avançado",
    difficulty: 3,
    boardSize: { width: 12, height: 8 },
    pieces: [
      {
        id: "piece-13",
        name: "F",
        color: "green",
        shape: [
          [0, 1, 1],
          [1, 1, 0],
          [0, 1, 0]
        ]
      },
      {
        id: "piece-14", 
        name: "N",
        color: "yellow",
        shape: [
          [0, 1],
          [1, 1],
          [1, 0],
          [1, 0]
        ]
      },
      {
        id: "piece-15",
        name: "Y",
        color: "purple",
        shape: [
          [0, 1, 0, 0],
          [1, 1, 1, 1]
        ]
      },
      {
        id: "piece-16",
        name: "V",
        color: "orange",
        shape: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 1]
        ]
      },
      {
        id: "piece-17",
        name: "W",
        color: "cyan",
        shape: [
          [1, 0, 0],
          [1, 1, 0],
          [0, 1, 1]
        ]
      },
      {
        id: "piece-18",
        name: "X",
        color: "pink",
        shape: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ]
      }
    ]
  }
];

export default PuzzleLevels;