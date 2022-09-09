import React from "react";
import { TETRISBLOCKS } from "../JS/tetrisBlocks";

import "../CSS/Cell.scss";

const Cell = ({ type }) => {
  // return <div className={`cell_${type}`}>{type}</div>;
  return <div className={`cell_${type}`}></div>;
};

export default Cell;
