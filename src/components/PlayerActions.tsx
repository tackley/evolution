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
    <Box mt={2} display="flex" justifyContent="center">
      <Button variant="contained" onClick={() => doAction("skip")}>
        Skip My Go
      </Button>
    </Box>
  );
};
