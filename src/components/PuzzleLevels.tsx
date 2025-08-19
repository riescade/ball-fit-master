import { PuzzleLevel } from '../types/GameTypes';

export const PuzzleLevels: PuzzleLevel[] = [
  {
    id: 1,
    name: "Iniciante 1",
    difficulty: 1,
    boardSize: { width: 8, height: 6 },
    pieces: [
      {
        id: "piece-1",
        name: "L Vermelho",
        color: "red",
        shape: [
          [1, 0],
          [1, 0],
          [1, 1]
        ]
      },
      {
        id: "piece-2",
        name: "I Azul",
        color: "blue",
        shape: [
          [1],
          [1],
          [1],
          [1]
        ]
      },
      {
        id: "piece-3",
        name: "T Verde",
        color: "green",
        shape: [
          [1, 1, 1],
          [0, 1, 0]
        ]
      },
      {
        id: "piece-4",
        name: "O Amarelo",
        color: "yellow",
        shape: [
          [1, 1],
          [1, 1]
        ]
      },
      {
        id: "piece-5",
        name: "Z Roxo",
        color: "purple",
        shape: [
          [1, 1, 0],
          [0, 1, 1]
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Iniciante 2",
    difficulty: 2,
    boardSize: { width: 9, height: 7 },
    pieces: [
      {
        id: "piece-6",
        name: "L Grande Laranja",
        color: "orange",
        shape: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 1]
        ]
      },
      {
        id: "piece-7",
        name: "S Rosa",
        color: "pink",
        shape: [
          [0, 1, 1],
          [1, 1, 0]
        ]
      },
      {
        id: "piece-8",
        name: "P Cinza",
        color: "gray",
        shape: [
          [1, 1],
          [1, 1],
          [1, 0]
        ]
      },
      {
        id: "piece-9",
        name: "Linha Branca",
        color: "white",
        shape: [
          [1, 1, 1, 1, 1]
        ]
      },
      {
        id: "piece-10",
        name: "Cruz Ciano",
        color: "cyan",
        shape: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Intermediário 1",
    difficulty: 3,
    boardSize: { width: 10, height: 8 },
    pieces: [
      {
        id: "piece-11",
        name: "U Vermelho",
        color: "red",
        shape: [
          [1, 0, 1],
          [1, 1, 1]
        ]
      },
      {
        id: "piece-12",
        name: "N Azul",
        color: "blue",
        shape: [
          [0, 1],
          [1, 1],
          [1, 0],
          [1, 0]
        ]
      },
      {
        id: "piece-13",
        name: "F Verde",
        color: "green",
        shape: [
          [0, 1, 1],
          [1, 1, 0],
          [0, 1, 0]
        ]
      },
      {
        id: "piece-14",
        name: "W Amarelo",
        color: "yellow",
        shape: [
          [1, 0, 0],
          [1, 1, 0],
          [0, 1, 1]
        ]
      },
      {
        id: "piece-15",
        name: "Y Roxo",
        color: "purple",
        shape: [
          [0, 1, 0, 0],
          [1, 1, 1, 1]
        ]
      },
      {
        id: "piece-16",
        name: "V Laranja",
        color: "orange",
        shape: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 1]
        ]
      }
    ]
  }
];

export default PuzzleLevels;