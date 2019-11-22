import Arrow from "./arrows";
import ArrowGroup from "./arrow_group";
import Player from "./player";
import Score from "./score";
import * as Util from "./utils";

const ARROW_IMAGES = {
  left: Util.leftArrow,
  right: Util.rightArrow,
  down: Util.downArrow,
  up: Util.upArrow
};

export default class Game {
  constructor(data) {
    this.arrows = {
      left: null,
      right: null,
      up: null,
      down: null
    };
    this.score = new Score(this);
    this.player = new Player({ game: this, score: this.score });
    this.activateArrow = Util.throttle(
      this.activateArrow.bind(this),
      data.frequency
    );
    this.createArrowGroups(data.velocity);
    this.populateArrows(data.arrows);
  }

  createArrowGroups(vel) {
    Object.keys(this.arrows).forEach(dir => {
      this.arrows[dir] = new ArrowGroup(vel);
    });
  }

  populateArrows(quantity) {
    const numArrows = Array.from(new Array(quantity), (x, i) => i);
    numArrows.forEach(x => {
      const direction = Util.randomDirection();
      this.arrows[direction].addQueue(
        new Arrow({ direction: direction, img: ARROW_IMAGES[direction] })
      );
    });
  }

  gameFinished() {
    return Object.values(this.arrows).every(
      el => !el.haveArrowsInQueue() && el.isEmpty()
    );
  }

  gameLost() {
    return this.score.missStreak >= 20;
  }

  noMoreQueue() {
    return Object.values(this.arrows).every(el => !el.haveArrowsInQueue());
  }

  activatePairArrows() {
    const [firstDir, secondDir] = Util.randomPair();
    const firstArrow = this.arrows[firstDir];
    const secondArrow = this.arrows[secondDir];

    if (firstArrow.haveArrowsInQueue()) {
      firstArrow.activateArrow();
    }

    if (secondArrow.haveArrowsInQueue()) {
      secondArrow.activateArrow();
    }
  }

  activateSingleArrow() {
    let direction = Util.randomDirection();
    while (!this.arrows[direction].haveArrowsInQueue()) {
      direction = Util.randomDirection();
    }

    this.arrows[direction].activateArrow();
  }

  activateArrow() {
    if (this.noMoreQueue()) return;
    const activateType = Math.floor(Math.random() * 14);
    if (activateType === 0 || activateType === 1) {
      this.activatePairArrows();
    } else if (activateType === 2) {
      return;
    } else {
      this.activateSingleArrow();
    }
  }

  removeArrow(direction) {
    this.arrows[direction].triggerRemoveArrow();
  }

  moveArrows(timeDelta) {
    Object.values(this.arrows).forEach(arrows => {
      if (arrows.removeOutOfBounds()) {
        this.score.addScore("miss");
      }

      arrows.moveActiveArrows(timeDelta);
    });
  }

  render(ctx, time) {
    ctx.clearRect(0, 0, 500, 500);
    this.player.render(ctx, time);
    this.score.render();

    Object.values(this.arrows).forEach(arrows => {
      arrows.renderActiveArrows(ctx);
    });
  }
}
