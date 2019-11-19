const DEFAULT_POS = {
  left: [10,500],
  down: [135, 500],
  up: [260, 500],
  right: [385, 500]
};

const TIME_DELTA = 1000 / 60;

export default class Arrows {
  constructor(data) {
    this.direction = data.direction; // which way the arrow is pointing
    this.position = DEFAULT_POS[this.direction]; // upper left most
    this.width = data.width || 105; // will be defined later
    this.height = data.height || 60; // to be determined
    this.velocity = 0; // movement speed
    this.striked = false; // checks if a user has tried to hit this
  }

  move(timeDelta) {
    const velocityScale = timeDelta / TIME_DELTA;
    const [posX, posY] = this.position;
    this.position = [posX, posY - this.velocity * velocityScale];
  }

  render(ctx) {
    const [posX, posY] = this.position;
    ctx.beginPath();
    ctx.rect(posX, posY, this.width, this.height);
    ctx.stroke();
  }

  assignVelocity(vel) {
    this.velocity = vel;
  }

}