import { dealNewGame } from "./game";

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
