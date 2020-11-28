import { Typography } from "@material-ui/core";
import React from "react";
import { Card } from "../model/card";

interface Props {
  deck: Card[];
}

export const DeckDisplay: React.FC<Props> = ({ deck }) => {
  return <Typography align="center">{deck.length} cards in deck</Typography>;
};
