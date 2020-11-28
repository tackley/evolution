import { Card } from "./card";
import { Player } from "./player";
import _ from "lodash";

export type Action = "skip";

export interface GameBoard {
  players: Player[];
  nextPlayerIdx: number;
}

export function dealNewGame(): GameBoard {
  return {
    players: [newPlayer("Red"), newPlayer("Blue")],
    nextPlayerIdx: 0,
  };
}

function newPlayer(name: string): Player {
  return {
    name,
    health: 50,
    deck: _.times(4, () => ({ value: 1, name: "1" })),
    attackForce: [],
    scienceForce: 0,
  };
}
