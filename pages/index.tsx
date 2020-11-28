import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { PlayerActions } from "../src/components/PlayerActions";
import { PlayerDisplay } from "../src/components/PlayerDisplay";
import { Action, dealNewGame, GameBoard } from "../src/model/game";
import { Player } from "../src/model/player";

import { produce } from "immer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100vh",
    },
  })
);

interface Props {
  board: GameBoard;
}

export default function Home() {
  const classes = useStyles();
  const [board, setBoard] = useState<GameBoard>(() => dealNewGame());

  const doAction = (a: Action) => {
    if (a === "skip") {
      setBoard(
        produce((draft: GameBoard) => {
          if (draft.nextPlayerIdx === 0) {
            draft.nextPlayerIdx = 1;
          } else {
            draft.nextPlayerIdx = 0;
          }
        })
      );
    }
  };

  return (
    <Box px={1}>
      <Box alignContent="center">
        <Typography variant="h2" gutterBottom align="center">
          Evolution
        </Typography>
      </Box>
      <Grid container className={classes.root} spacing={1}>
        {board.players.map((player, idx) => {
          const isCurrentPlayer = idx === board.nextPlayerIdx;
          return (
            <Grid key={player.name} item xs={6}>
              <PlayerDisplay player={player} current={isCurrentPlayer} />
              {isCurrentPlayer && (
                <PlayerActions player={player} doAction={doAction} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
