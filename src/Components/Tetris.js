import React, { useState } from "react";

import Stage from "./Stage";
import Display from "./Display";
import SpeedSlider from "./SpeedSlider";
import StartButton from "./StartButton";
import { useInterval } from "../Hooks/useInterval";
import { usePlayer } from "../Hooks/usePlayer";
import { useStage } from "../Hooks/useStage";
import { useGameStatus } from "../Hooks/useGameStatus";
import { createStage, checkCollision } from "../JS/gameHelpers";
import "../CSS/Tetris.scss";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(0);
    setRows(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);

      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y <= 0) {
        console.log("GAME OVER!!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const downKeyRelease = ({ keycode }) => {
    if (!gameOver) {
      //if (keycode === 40) {
      setDropTime(1000 / (level + 1) + 200);
      //}
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
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
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div
      className="tetrisWrapper"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={downKeyRelease}
    >
      <div className="tetris">
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
              <SpeedSlider />
            </div>
          )}

          <StartButton callback={startGame} />
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
