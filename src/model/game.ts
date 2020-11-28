import { Card } from "./card";
import { Player } from "./player";
import _ from "lodash";
import produce from "immer";

export type Action = "skip" | "science" | "attack";

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

export const processAction = (board: GameBoard, action: Action): GameBoard => {
  return produce(board, (draft) => {
    const thisPlayer = draft.players[draft.nextPlayerIdx];

    if (action == "science") {
      const [nextCard, ...rest] = thisPlayer.deck;
      thisPlayer.scienceForce += nextCard.value;
      thisPlayer.deck = [...rest, nextCard];
    }

    if (action == "attack") {
      const [nextCard, ...rest] = thisPlayer.deck;
      thisPlayer.attackForce.push(nextCard);
      thisPlayer.deck = rest;
    }

    if (draft.nextPlayerIdx === 0) {
      draft.nextPlayerIdx = 1;
    } else {
      draft.nextPlayerIdx = 0;

      // end of round, so update health!
      const p0AttackPower = _.sumBy(draft.players[0].attackForce, "value");
      const p1AttackPower = _.sumBy(draft.players[1].attackForce, "value");

      draft.players[0].health += p0AttackPower - p1AttackPower;
      draft.players[1].health += p1AttackPower - p0AttackPower;
    }
  });
};

export const findWinner = (board: GameBoard): Player | undefined => {
  const loser = board.players.find((p) => p.deck.length == 0 || p.health <= 0);

  if (loser) {
    return board.players.find((p) => p !== loser);
  }

  return undefined;
};
