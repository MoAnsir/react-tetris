import { useState } from "react";
import { randomTetromino } from "../JS/tetrisBlocks";

export const useStage = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetrisBlock: randomTetromino().shape,
    collided: false,
  });

  return [player];
};
