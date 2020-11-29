import { Typography } from "@material-ui/core";
import React from "react";
import { Card } from "../model/card";

interface HasName {
  name: string;
}

interface Props {
  attackForce: HasName[];
}

export const AttackForceDisplay: React.FC<Props> = ({ attackForce }) => {
  return (
    <Typography align="center">
      {JSON.stringify(attackForce.map((c) => c.name))}
    </Typography>
  );
};
