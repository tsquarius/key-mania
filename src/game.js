import Arrow from "./arrows";
import Player from "./player";
import * as Util from "./utils";

const ArrowDirections = ["left", "right", "up", "down"];

const DEFAULT_ARROWS = {
  easy: 200,
  medium: 300,
  hard: 400
};

export default class Game {
  constructor() {
    this.arrowsQueue = {
      left: [],
      right: [],
      down: [],
      up: []
    };
    this.arrowsActive = {
      left: [],
      right: [],
      down: [],
      up: []
    };

    this.velocity = 3;
    this.player = new Player(this);
    // this.difficulty = difficulty;
    this.populateArrows();
    this.activateArrow = Util.throttle(this.activateArrow.bind(this), 400);
  }

  populateArrows() {
    const numArrows = Array.from(new Array(200), (x, i) => i);
    numArrows.forEach(x => {
      const direction = Util.randomDirection();
      this.arrowsQueue[direction].push(
        new Arrow({ direction: direction, height: 40 })
      );
    });
  }

  activateArrow() {
    const direction = Util.randomDirection();

    if (this.arrowsQueue[direction].length > 0) {
      const arrow = this.arrowsQueue[direction].pop();
      arrow.assignVelocity(this.velocity);

      this.arrowsActive[direction].push(arrow);
    }
  }

  removeArrow(direction) {
    this.arrowsActive[direction].shift();
  }

  removeDefault() {
    ArrowDirections.forEach(dir => {
      const firstArrow = this.arrowsActive[dir][0];
      if (!firstArrow) return;
      if (firstArrow.position[1] < 10) {
        this.removeArrow(dir);
      }
    });
  }

  moveArrows(timeDelta) {
    this.removeDefault();
    ArrowDirections.forEach(dir => {
      this.arrowsActive[dir].forEach(arrow => {
        arrow.move(timeDelta);
      });
    });
  }

  render(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    this.player.render(ctx);

    ArrowDirections.forEach(dir => {
      this.arrowsActive[dir].forEach(arrow => {
        arrow.render(ctx);
      });
    });
  }
}
