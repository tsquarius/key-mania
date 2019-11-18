import Arrow from "./arrows";

const ArrowDirections = [
  'left', 'right', 'up', 'down'
];

const DEFAULT_ARROWS = {
  easy: 200,
  medium: 300,
  hard: 400
};


function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}


export default class Game {
  constructor() {
    this.arrowsQueue = [];
    this.arrowsActive = [];
    this.velocity = 4;
    // this.difficulty = difficulty;
    this.populateArrows();
    this.activateArrow = debounce(this.activateArrow.bind(this), 18);
  }

  populateArrows() {
    const numArrows = Array.from(new Array(200), (x,i) => i);
    numArrows.forEach(x => {
      const rndm = Math.floor(Math.random() * 4);
      const direction = ArrowDirections[rndm];
      this.arrowsQueue.push(new Arrow({direction}));
    });
  }

  activateArrow() {
    if (this.arrowsQueue.length > 0) {
      const arrow = this.arrowsQueue.pop();
      arrow.assignVelocity(this.velocity);
      this.arrowsActive.push(arrow);
    }
  }

  moveArrows(timeDelta) {
    this.arrowsActive.forEach(arrow => {
      arrow.move(timeDelta);
    });
  }

  render(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    this.arrowsActive.forEach(arrow => {
      arrow.render(ctx);
    });
  }
}
