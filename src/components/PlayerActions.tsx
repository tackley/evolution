import { Box, Button } from "@material-ui/core";
import React from "react";
import { Action } from "../model/game";
import { Player } from "../model/player";

interface Props {
  player: Player;
  doAction: React.Dispatch<Action>;
}

export const PlayerActions: React.FC<Props> = ({ player, doAction }) => {
  return (
    <>
      <Button variant="contained" onClick={() => doAction("science")}>
        Science
      </Button>
      <Button variant="contained" onClick={() => doAction("attack")}>
        Attack
      </Button>
      <Button onClick={() => doAction("skip")}>Skip</Button>
    </>
  );
};
