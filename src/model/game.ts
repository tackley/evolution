import { Card, CARDS } from "./card";
import { Player } from "./player";
import _ from "lodash";
import produce from "immer";
import { TECH1, Technology } from "./technology";

export type ActionTypes = "skip" | "science" | "attack" | "research";

export interface Action {
  type: ActionTypes;
}

export interface ResearchTechAction extends Action {
  type: "research";
  technology: Technology;
}

export const ACTION_SKIP: Action = { type: "skip" };
export const ACTION_SCIENCE: Action = { type: "science" };
export const ACTION_ATTACK: Action = { type: "attack" };
export function mkActionResearch(t: Technology): ResearchTechAction {
  return { type: "research", technology: t };
}

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
    deck: _.times(4, () => CARDS.ONE),
    attackForce: [],
    scienceForce: 0,
    researched: [TECH1],
  };
}

export const processAction = (board: GameBoard, action: Action): GameBoard => {
  return produce(board, (draft) => {
    const thisPlayer = draft.players[draft.nextPlayerIdx];

    if (action.type === "science") {
      const [nextCard, ...rest] = thisPlayer.deck;
      thisPlayer.scienceForce += nextCard.value;
      thisPlayer.deck = [...rest, nextCard];
    }

    if (action.type === "attack") {
      const [nextCard, ...rest] = thisPlayer.deck;
      thisPlayer.attackForce.push(nextCard);
      thisPlayer.deck = rest;
    }

    if (action.type === "research") {
      const researchAction = action as ResearchTechAction;
      const tech = researchAction.technology;
      thisPlayer.scienceForce -= tech.cost;
      thisPlayer.researched.push(tech);
      _.times(4, () => thisPlayer.deck.push(tech.card));
      thisPlayer.deck = _.shuffle(thisPlayer.deck);
      return;
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
