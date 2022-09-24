import React, { useState } from "react";

import "../CSS/LeaderBoard.scss";

const LeaderBoard = ({ highestScore }) => {
  return (
    <div className="leader-board">
      <p>LeaderBoard</p>
      <p>
        <span>Name - </span>
        {highestScore}
      </p>
      <p>
        <span>Name - </span>
        {highestScore}
      </p>
      <p>
        <span>Name - </span>
        {highestScore}
      </p>
      <p>
        <span>Name - </span>
        {highestScore}
      </p>
      <p>
        <span>Name - </span>
        {highestScore}
      </p>
    </div>
  );
};

export default LeaderBoard;
