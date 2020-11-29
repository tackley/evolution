import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { PlayerActions } from "../src/components/PlayerActions";
import { PlayerDisplay } from "../src/components/PlayerDisplay";
import {
  Action,
  dealNewGame,
  findWinner,
  GameBoard,
  processAction,
} from "../src/model/game";

import { CardDisplay } from "../src/components/CardDisplay";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      // height: "100vh",
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const [board, setBoard] = useState<GameBoard>(() => dealNewGame());
  const [showTopCard, setShowTopCard] = useState<boolean>(false);

  const doAction = (a: Action) => {
    setShowTopCard(true);

    setTimeout(() => {
      setShowTopCard(false);
      setBoard((b) => processAction(b, a));
    }, 500);
  };

  const winner = findWinner(board);
  const gameOver = !!winner;

  return (
    <Box px={1}>
      <Box alignContent="center">
        <Typography variant="h2" gutterBottom align="center">
          Evolution
        </Typography>
      </Box>
      <Grid container className={classes.root} spacing={1}>
        {board.players.map((player, idx) => {
          const isCurrentPlayer = !gameOver && idx === board.nextPlayerIdx;
          return (
            <Grid key={player.name} item xs={6}>
              <PlayerDisplay player={player} current={isCurrentPlayer} />
              <Box mt={2} display="flex" justifyContent="space-evenly">
                {isCurrentPlayer && showTopCard && (
                  <CardDisplay card={player.deck[0]} />
                )}
                {isCurrentPlayer && !showTopCard && (
                  <PlayerActions player={player} doAction={doAction} />
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box>
        {winner && <Typography>{winner.name} is the winner</Typography>}
      </Box>
    </Box>
  );
}
