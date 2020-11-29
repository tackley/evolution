import { Card } from "./card";
import { Technology } from "./technology";

export interface Player {
  name: string;
  health: number;
  deck: Card[];
  scienceForce: number;
  attackForce: Card[];

  researched: Technology[];
}
