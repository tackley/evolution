import { dealNewGame, processAction } from "./game";

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
  const newBoard = processAction(board, "science");

  expect(board.nextPlayerIdx).toEqual(0);
  expect(newBoard.nextPlayerIdx).toEqual(1);

  const redPlayer = newBoard.players[0];
  expect(redPlayer.scienceForce).toEqual(1);
  expect(redPlayer.deck).toHaveLength(4);
});

it("should process attack correctly for a player", () => {
  const board = dealNewGame();

  expect(board.nextPlayerIdx).toEqual(0);
  const newBoard = processAction(board, "attack");

  expect(board.nextPlayerIdx).toEqual(0);
  expect(newBoard.nextPlayerIdx).toEqual(1);

  const redPlayer = newBoard.players[0];
  expect(redPlayer.scienceForce).toEqual(0);
  expect(redPlayer.deck).toHaveLength(3);
  expect(redPlayer.attackForce).toHaveLength(1);
});

it("should do attacks at end of turn", () => {
  const board = dealNewGame();

  expect(board.nextPlayerIdx).toEqual(0);
  const newBoard1 = processAction(board, "attack");
  const newBoard2 = processAction(newBoard1, "skip");

  expect(newBoard2.players[0].health).toEqual(51);
  expect(newBoard2.players[1].health).toEqual(49);
});
