import Arrow from "./arrows";
import ArrowGroup from "./arrow_group";
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
    this.velocity = 3;
    this.arrows = {
      left: new ArrowGroup(this.velocity),
      right: new ArrowGroup(this.velocity),
      up: new ArrowGroup(this.velocity),
      down: new ArrowGroup(this.velocity)
    };
    this.player = new Player(this);
    this.populateArrows();
    this.activateArrow = Util.throttle(this.activateArrow.bind(this), 400);
  }

  populateArrows() {
    const numArrows = Array.from(new Array(200), (x, i) => i);
    numArrows.forEach(x => {
      const direction = Util.randomDirection();
      this.arrows[direction].addQueue(
        new Arrow({ direction: direction, height: 40 })
      );
    });
  }

  gameOver() {
    return Object.values(this.arrows).every(
      el => !el.haveArrowsInQueue() && el.isEmpty()
    );
  }

  noMoreQueue() {
    return Object.values(this.arrows).every(el => !el.haveArrowsInQueue());
  }

  activateArrow() {
    if (this.noMoreQueue()) return;

    let direction = Util.randomDirection();
    while (!this.arrows[direction].haveArrowsInQueue()) {
      direction = Util.randomDirection();
    }

    if (!this.arrows[direction].haveArrowsInQueue()) return;
    this.arrows[direction].activateArrow();
  }

  removeArrow(direction) {
    this.arrows[direction].triggerRemoveArrow();
  }

  moveArrows(timeDelta) {
    Object.values(this.arrows).forEach(arrows => {
      arrows.removeOutOfBounds();
      arrows.moveActiveArrows(timeDelta);
    });
  }

  render(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    this.player.render(ctx);

    Object.values(this.arrows).forEach(arrows => {
      arrows.renderActiveArrows(ctx);
    });
  }
}
