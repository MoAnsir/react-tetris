import React from "react";
import Cell from "./Cell";

import "../CSS/Stage.scss";

const Stage = ({ stage }) => {
  return (
    <div className="stage">
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </div>
  );
};

export default Stage;
