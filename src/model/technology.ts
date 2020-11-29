import { freeze } from "immer";
import { Card, CARDS } from "./card";

export interface Technology {
  name: string;
  cost: number;
  prereqs: Technology[];

  card: Card;
}

function mkTech(t: Technology): Technology {
  return freeze(t);
}

export const TECH1 = mkTech({
  name: "1",
  cost: 0,
  prereqs: [],
  card: CARDS.ONE,
});

export const TECH2 = mkTech({
  name: "2",
  cost: 3,
  prereqs: [TECH1],
  card: CARDS.TWO,
});

export const TECH3 = mkTech({
  name: "3",
  cost: 4,
  prereqs: [TECH2],
  card: CARDS.THREE,
});

export const TECH4 = mkTech({
  name: "4",
  cost: 6,
  prereqs: [TECH3],
  card: CARDS.FOUR,
});

export const TECH5 = mkTech({
  name: "5",
  cost: 9,
  prereqs: [TECH4],
  card: CARDS.FIVE,
});

export const TECH6 = mkTech({
  name: "6",
  cost: 13,
  prereqs: [TECH5],
  card: CARDS.SIX,
});

export const TECH7 = mkTech({
  name: "7",
  cost: 18,
  prereqs: [TECH6],
  card: CARDS.SEVEN,
});

export const TECH8 = mkTech({
  name: "8",
  cost: 24,
  prereqs: [TECH7],
  card: CARDS.EIGHT,
});

export const TECH9 = mkTech({
  name: "9",
  cost: 31,
  prereqs: [TECH8],
  card: CARDS.NINE,
});

export const ALL_TECH = [
  TECH1,
  TECH2,
  TECH3,
  TECH4,
  TECH5,
  TECH6,
  TECH7,
  TECH8,
  TECH9,
];

export function availableTech({
  scienceForce,
  researched,
}: {
  scienceForce: number;
  researched: Technology[];
}): Technology[] {
  return ALL_TECH.filter(
    (t) =>
      // we can afford it
      scienceForce >= t.cost &&
      // we don't alredy have it
      !researched.includes(t) &&
      // we have all the pre-reqs
      t.prereqs.every((p) => researched.includes(p))
  );
}
