import { freeze } from "immer";

export interface Card {
  name: string;
  value: number;
}

export const CARDS = freeze(
  {
    ONE: { name: "1", value: 1 },
    TWO: { name: "2", value: 2 },
    THREE: { name: "3", value: 3 },
    FOUR: { name: "4", value: 4 },
    FIVE: { name: "5", value: 5 },
    SIX: { name: "6", value: 6 },
    SEVEN: { name: "7", value: 7 },
    EIGHT: { name: "8", value: 8 },
    NINE: { name: "9", value: 9 },
  },
  true
);
