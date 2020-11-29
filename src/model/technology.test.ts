import { availableTech, TECH1 } from "./technology";

it("should return the list of available technologies for a player", () => {
  expect(availableTech({ scienceForce: 0, researched: [] })).toHaveLength(1);
  expect(availableTech({ scienceForce: 0, researched: [TECH1] })).toHaveLength(
    0
  );
  expect(availableTech({ scienceForce: 5, researched: [TECH1] })).toHaveLength(
    1
  );
});
