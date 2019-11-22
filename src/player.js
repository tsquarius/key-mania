import * as Util from "./utils";

const DEFAULT_POS = {
  left: [37.5, 60],
  down: [162.5, 60],
  up: [287.5, 60],
  right: [412.5, 60]
};

export default class Player {
  constructor(data) {
    this.game = data.game;
    this.score = data.score;
    this.images = {
      left: Util.fixedLeft,
      right: Util.fixedRight,
      down: Util.fixedDown,
      up: Util.fixedUp
    };
    this.strikedArrow = null;
  }

  hitArrow(direction) {
    const target = this.game.arrows[direction].oldestActiveArrow();
    if (!target) return;

    // Only consider clicks if it is close to the hit-zone
    if (target.position[1] < 90) {
      const acc = this.checkAccuracy(target.position);
      if (acc != "miss") {
        target.striked = true;
        this.strikedArrow = target;
      }
      this.game.removeArrow(direction);
      this.score.addScore(acc);
    }
  }

  checkAccuracy(position) {
    const top = position[1];
    const diff = Math.abs(60 - top);

    if (diff <= 3) {
      return "perfect";
    } else if (diff <= 8) {
      return "great";
    } else if (diff <= 15) {
      return "good";
    } else {
      return "miss";
    }
  }

  render(ctx) {
    Object.keys(this.images).forEach(dir => {
      const [posX, posY] = DEFAULT_POS[dir];
      ctx.drawImage(this.images[dir], posX, posY);
    });

    if (this.strikedArrow) {
      this.strikedArrow.move(17);
      this.strikedArrow.render(ctx);
    }
  }
}
