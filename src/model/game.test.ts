import { produce } from "immer";
import {
  ACTION_ATTACK,
  ACTION_SCIENCE,
  ACTION_SKIP,
  dealNewGame,
  mkActionResearch,
  processAction,
} from "./game";
import { TECH2 } from "./technology";

it("should deal a new game correctly", () => {
  const board = dealNewGame();

  const players = board.players;

  expect(players).toHaveLength(2);

  const redPlayer = players[0];
  const bluePlayer = players[1];

  expect(redPlayer.name).toEqual("Red");
  expect(redPlayer.health).toEqual(50);
  expect(redPlayer.deck).toHaveLength(4);
  expect(redPlayer.deck.map((c) => c.value)).toEqual([1, 1, 1, 1]);

  expect(bluePlayer.name).toEqual("Blue");
  expect(bluePlayer.health).toEqual(50);
  expect(bluePlayer.deck).toHaveLength(4);
  expect(bluePlayer.deck.map((c) => c.value)).toEqual([1, 1, 1, 1]);
});

it("should process science correctly for a player", () => {
  const board = dealNewGame();

  expect(board.nextPlayerIdx).toEqual(0);
  const newBoard = processAction(board, ACTION_SCIENCE);

  expect(board.nextPlayerIdx).toEqual(0);
  expect(newBoard.nextPlayerIdx).toEqual(1);

  const redPlayer = newBoard.players[0];
  expect(redPlayer.scienceForce).toEqual(1);
  expect(redPlayer.deck).toHaveLength(4);
});

it("should process attack correctly for a player", () => {
  const board = dealNewGame();

  expect(board.nextPlayerIdx).toEqual(0);
  const newBoard = processAction(board, ACTION_ATTACK);

  expect(newBoard.nextPlayerIdx).toEqual(1);
  const redPlayer = newBoard.players[0];
  expect(redPlayer.attackForce).toHaveLength(1);
  expect(redPlayer.deck).toHaveLength(3);

  expect(redPlayer).toMatchInlineSnapshot(`
    Object {
      "attackForce": Array [
        Object {
          "name": "1",
          "value": 1,
        },
      ],
      "deck": Array [
        Object {
          "name": "1",
          "value": 1,
        },
        Object {
          "name": "1",
          "value": 1,
        },
        Object {
          "name": "1",
          "value": 1,
        },
      ],
      "health": 50,
      "name": "Red",
      "researched": Array [
        Object {
          "card": Object {
            "name": "1",
            "value": 1,
          },
          "cost": 0,
          "name": "1",
          "prereqs": Array [],
        },
      ],
      "scienceForce": 0,
    }
  `);
});

it("should do attacks at end of turn", () => {
  const board = dealNewGame();

  expect(board.nextPlayerIdx).toEqual(0);
  const newBoard1 = processAction(board, ACTION_ATTACK);
  const newBoard2 = processAction(newBoard1, ACTION_SKIP);

  expect(newBoard2.players[0].health).toEqual(51);
  expect(newBoard2.players[1].health).toEqual(49);
});

it("should apply research", () => {
  const board = produce(dealNewGame(), (draft) => {
    draft.players[0].scienceForce = 10;
  });

  expect(board.nextPlayerIdx).toEqual(0);
  const newBoard = processAction(board, mkActionResearch(TECH2));

  expect(newBoard.nextPlayerIdx).toEqual(0);
  const redPlayer = newBoard.players[0];
  expect(redPlayer.scienceForce).toEqual(7);
  expect(redPlayer.deck).toHaveLength(8);
  expect(redPlayer.researched).toHaveLength(2);
  expect(redPlayer.researched).toContain(TECH2);
});
