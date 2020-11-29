import { Grid, Box, Typography, LinearProgress } from "@material-ui/core";
import React from "react";
import { Player } from "../model/player";
import _ from "lodash";
import { DeckDisplay } from "./HandDisplay";
import { AttackForceDisplay } from "./AttackForceDisplay";

const COLOUR_MAP: _.Dictionary<string> = {
  Red: "red",
  Blue: "#8080ff",
};

interface Props {
  player: Player;
  current: boolean;
}

export const PlayerDisplay: React.FC<Props> = ({ player, current }) => {
  const color = COLOUR_MAP[player.name];
  return (
    <Box
      bgcolor={color}
      padding={1}
      border={5}
      borderColor={current ? "black" : color}
    >
      <Typography variant="h4" align="center">
        {player.name}
      </Typography>

      <Box pt={2}>
        <LinearProgress variant="determinate" value={player.health} />
      </Box>

      <Box pt={2}>
        <DeckDisplay deck={player.deck} />
      </Box>

      <Box pt={2}>
        <Typography align="center" variant="subtitle1">
          Attacking Force:{" "}
        </Typography>
        <AttackForceDisplay attackForce={player.attackForce} />
      </Box>

      <Box pt={2}>
        <Typography align="center" variant="subtitle1">
          Researched:{" "}
        </Typography>
        <AttackForceDisplay attackForce={player.researched} />
      </Box>

      <Box pt={2}>
        <Typography align="center" variant="subtitle1">
          Science Force: {player.scienceForce}
        </Typography>
      </Box>
    </Box>
  );
};
