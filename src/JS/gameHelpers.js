export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetrisBlock.length; y += 1) {
    for (let x = 0; x < player.tetrisBlock[y].length; x += 1) {
      // Check that we are actually on a tetris block cell - 0 is empty anything else(i,t...) is a tetris block
      if (player.tetrisBlock[y][x] !== 0) {
        // check movement inside the game area height - y
        // make sure we cant go past the bottom
        // check movement inside the game area width - x
        //make sure the cell we are moving into isn't clear - Im still not sure what clear is. think we have 2 clear and merged.
        // console.log(
        //   "stage[y + player.pos.y + moveY] - ",
        //   stage[y + player.pos.y + moveY]
        // );
        // console.log(
        //   "stage[x + player.pos.x + moveX] - ",
        //   stage[x + player.pos.x + moveX]
        // );
        // console.log(
        //   "stage[x + player.pos.x + moveX][1] - ",
        //   stage[x + player.pos.x + moveX][1]
        // );
        if (
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
