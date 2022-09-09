import React from "react";
import Stage from "./Stage";
import Dispaly from "./Display";
import StartButton from "./StartButton";

import "../CSS/Tetris.scss";

import { createStage } from "../JS/gameHelpers";

const Tetris = () => {
  return (
    <div className="tetrisWrapper">
      <div className="tetris">
        <Stage stage={createStage()} />
        <aside>
          <div>
            <Dispaly text="Score" />
            <Dispaly text="Rows" />
            <Dispaly text="Level" />
          </div>
          <StartButton />
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
