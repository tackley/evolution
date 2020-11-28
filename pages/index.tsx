import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100vh",
    },

    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Box alignContent="center">
        <Typography variant="h2" gutterBottom align="center">
          Evolution
        </Typography>
      </Box>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <Box bgcolor="red" height="100%">
            RED
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box bgcolor="blue" height="100%">
            BLUE
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
