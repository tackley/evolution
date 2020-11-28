import { CardContent, Typography } from "@material-ui/core";
import React from "react";
import { Card } from "../model/card";
import { Card as MuiCard } from "@material-ui/core";

interface Props {
  card: Card;
}

export const CardDisplay: React.FC<Props> = ({ card }) => {
  return (
    <MuiCard>
      <CardContent>
        <Typography variant="h1">{card.name}</Typography>
      </CardContent>
    </MuiCard>
  );
};
