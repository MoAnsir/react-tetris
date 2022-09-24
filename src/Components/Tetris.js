import React, { useState, useEffect } from "react";

import Stage from "./Stage";
import Display from "./Display";
import SpeedSlider from "./SpeedSlider";
import StartButton from "./StartButton";
import LeaderBoard from "./LeaderBoard";
import UserNameModal from "./UserNameModal";
import { useInterval } from "../Hooks/useInterval";
import { usePlayer } from "../Hooks/usePlayer";
import { useStage } from "../Hooks/useStage";
import { useGameStatus } from "../Hooks/useGameStatus";
import {
  createStage,
  checkCollision,
  MAGT1,
  MAGT2,
  MAGT3,
  MAGT4,
  MAGT5,
} from "../JS/gameHelpers";
import "../CSS/Tetris.scss";
import { get, set } from "idb-keyval";

// Add in highest score. Save to local storage and have it persist on machine.

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [speedSlider, useSpeedSlider] = useState(500);
  const [highestScore, setHighestScore] = useState(0);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [showModal, setShowModal] = useState(false);
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  useEffect(() => {
    get("Tetris-Score").then((val) => {
      setHighestScore(val || 0);
    });
  }, []);

  useEffect(() => {
    if (score > highestScore) {
      set("Tetris-Score", score);
      setHighestScore(score);
    }
  }, [score, gameOver]);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  useEffect(() => {
    setDropTime(speedSlider);
    // If she get to a certain score that add in the custom speeds using the MAGT's
  }, [speedSlider]);

  const startGame = () => {
    setStage(createStage());
    //control speed
    //setDropTime(100);
    setDropTime(speedSlider);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(0);
    setRows(0);
  };

  const handleKeyPress = (e) => {
    // bring up a modal, take a name input from the user, click save button to close and log.
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);

      //setDropTime(speedSlider / (level + 1) + 200);
      setDropTime(speedSlider);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y <= 0) {
        console.log("GAME OVER!!!!");
        setGameOver(true);
        setShowModal(!showModal);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const downKeyRelease = ({ keycode }) => {
    if (!gameOver) {
      if (keycode === 40) {
        //setDropTime(speedSlider / (level + 1) + 200);
        setDropTime(speedSlider);
      }
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
    if (keyCode === 13) {
      startGame();
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
              <LeaderBoard highestScore={highestScore} />
              <SpeedSlider speedAdjust={useSpeedSlider} />
            </div>
          )}

          <StartButton callback={startGame} />
        </aside>
      </div>
      <UserNameModal showModal={showModal} hideModal={setShowModal} />
    </div>
  );
};

export default Tetris;
