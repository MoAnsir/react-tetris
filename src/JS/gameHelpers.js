export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const MAGT1 = 75;
export const MAGT2 = 50;
export const MAGT3 = 25;
export const MAGT4 = 15;
export const MAGT5 = 10;
export const DEV_MODE = false; //DEV MODE

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetrisBlock.length; y += 1) {
    for (let x = 0; x < player.tetrisBlock[y].length; x += 1) {
      if (player.tetrisBlock[y][x] !== 0) {
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
