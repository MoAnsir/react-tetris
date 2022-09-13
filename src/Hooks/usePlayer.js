import { useState, useCallback } from "react";
import { cloneDeep } from "lodash";
import { TETRISBLOCKS, randomTetromino, tetrisBlock } from "../JS/tetrisBlocks";
import { checkCollision, STAGE_WIDTH } from "../JS/gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetrisBlock: TETRISBLOCKS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    const rotatedBlock = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    if (dir > 0) return rotatedBlock.map((row) => row.reverse());
    return rotatedBlock.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = cloneDeep(player);

    clonedPlayer.tetrisBlock = rotate(clonedPlayer.tetrisBlock, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;

    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > clonedPlayer.tetrisBlock[0].length) {
        rotate(clonedPlayer.tetrisBlock, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,

      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetrisBlock: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
