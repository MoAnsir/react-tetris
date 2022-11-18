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
import { createStage, checkCollision, MAGT1, MAGT2, MAGT3, MAGT4, MAGT5 } from "../JS/gameHelpers";
import "../CSS/Tetris.scss";
import { get, set } from "idb-keyval";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [speedSlider, useSpeedSlider] = useState(500);
  const [highestScore, setHighestScore] = useState("");
  const [userSaveData, setUserSaveData] = useState("");

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [showModal, setShowModal] = useState(false);
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  useEffect(() => {
    get("Tetris-Score").then((val) => {
      setUserSaveData(val || "");
    });
  }, []);

  useEffect(() => {
    if (score > highestScore) {
      setHighestScore(score);
    }
  }, [score, highestScore]);

  useEffect(() => {
    set("Tetris-Score", userSaveData);
  }, [userSaveData, gameOver]);

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
    //setScore({id: 1, name: "Maggie", score: 1200}); // What it should look like
    //setScore({id: 2, name: "", score: 0}); // Default value
    setScore(0);
    setLevel(0);
    setRows(0);
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
      if (keyCode === 75) {
        //K - left
        movePlayer(-1);
      } else if (keyCode === 76) {
        //L - right
        movePlayer(1);
        // } else if (keyCode === 74) {
        //   //J - down
        //   dropPlayer();
      } else if (keyCode === 65) {
        //A - rotate
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
    <div className="tetrisWrapper" role="button" tabIndex="0" onKeyDown={(e) => move(e)} onKeyUp={downKeyRelease}>
      <div className="tetris">
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over" />
              <LeaderBoard userSaveData={userSaveData} />
            </>
          ) : (
            <>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
              <LeaderBoard userSaveData={userSaveData} />
              <SpeedSlider speedAdjust={useSpeedSlider} />
            </>
          )}

          <StartButton callback={startGame} />
        </aside>
      </div>
      <UserNameModal showModal={showModal} hideModal={setShowModal} userScore={highestScore} userSaveData={userSaveData} setUserSaveData={setUserSaveData} />
    </div>
  );
};

export default Tetris;
