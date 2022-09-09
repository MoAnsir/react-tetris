import React, { useState } from "react";

import Stage from "./Stage";
import Dispaly from "./Display";
import StartButton from "./StartButton";
import { usePlayer } from "../Hooks/usePlayer";
import { useStage } from "../Hooks/useStage";
import { createStage } from "../JS/gameHelpers";
import "../CSS/Tetris.scss";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);
  console.log("re-render");

  const movePlayer = (dir) => {
    updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };

  return (
    <div
      className="tetrisWrapper"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
    >
      <div className="tetris">
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Dispaly gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Dispaly text="Score" />
              <Dispaly text="Rows" />
              <Dispaly text="Level" />
            </div>
          )}

          <StartButton onClick={startGame} />
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
