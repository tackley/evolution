import { Card } from "./card";

export interface Player {
  name: string;
  health: number;
  deck: Card[];
  scienceForce: number;
  attackForce: Card[];
}
