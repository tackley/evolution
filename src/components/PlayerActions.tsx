import { Box, Button } from "@material-ui/core";
import React from "react";
import {
  Action,
  ACTION_ATTACK,
  ACTION_SCIENCE,
  ACTION_SKIP,
  mkActionResearch,
} from "../model/game";
import { Player } from "../model/player";
import { availableTech } from "../model/technology";

interface Props {
  player: Player;
  doAction: React.Dispatch<Action>;
}

export const PlayerActions: React.FC<Props> = ({ player, doAction }) => {
  const tech = availableTech(player);
  return (
    <>
      <Button variant="contained" onClick={() => doAction(ACTION_SCIENCE)}>
        Science
      </Button>
      <Button variant="contained" onClick={() => doAction(ACTION_ATTACK)}>
        Attack
      </Button>
      {tech.map((t) => (
        <Button key={t.name} variant="contained" onClick={() => doAction(mkActionResearch(t))}>
          Buy Tech {t.name}
        </Button>
      ))}
      <Button onClick={() => doAction(ACTION_SKIP)}>Skip</Button>
    </>
  );
};
