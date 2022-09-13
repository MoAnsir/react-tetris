import React from "react";
import { TETRISBLOCKS } from "../JS/tetrisBlocks";

import "../CSS/Cell.scss";

const Cell = ({ type }) => {
  return <div className={`cell cell_${type}`}></div>;
};

export default React.memo(Cell);
