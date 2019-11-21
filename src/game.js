import Arrow from "./arrows";
import ArrowGroup from "./arrow_group";
import Player from "./player";
import Score from "./score";
import * as Util from "./utils";

export default class Game {
  constructor(data) {
    this.arrows = {
      left: new ArrowGroup(data.velocity),
      right: new ArrowGroup(data.velocity),
      up: new ArrowGroup(data.velocity),
      down: new ArrowGroup(data.velocity)
    };
    this.score = new Score(this);
    this.player = new Player({ game: this, score: this.score });
    this.activateArrow = Util.throttle(
      this.activateArrow.bind(this),
      data.frequency
    );
    this.populateArrows(data.arrows);
  }

  populateArrows(quantity) {
    const numArrows = Array.from(new Array(quantity), (x, i) => i);
    numArrows.forEach(x => {
      const direction = Util.randomDirection();
      this.arrows[direction].addQueue(
        new Arrow({ direction: direction })
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
      if (arrows.removeOutOfBounds()) {
        this.score.addScore("miss");
      }

      arrows.moveActiveArrows(timeDelta);
    });
  }

  render(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    this.player.render(ctx);
    this.score.render();

    Object.values(this.arrows).forEach(arrows => {
      arrows.renderActiveArrows(ctx);
    });
  }
}
