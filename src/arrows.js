const DEFAULT_POS = {
  left: [37.5, 500],
  down: [162.5, 500],
  up: [287.5, 500],
  right: [412.5, 500]
};

const TIME_DELTA = 1000 / 60;

const ARROW_IMAGES = {
  left: '../assets/left50.png',
  right: '../assets/right50.png',
  up: '../assets/up50.png',
  down: '../assets/down50.png'
};


export default class Arrows {
  constructor(data) {
    this.direction = data.direction; // which way the arrow is pointing
    this.position = DEFAULT_POS[this.direction]; // upper left most
    this.velocity = 0; // movement speed
    this.striked = false; // checks if a user has tried to hit this
    this.img = new Image();
    this.img.src = ARROW_IMAGES[data.direction];
  }

  move(timeDelta) {
    const velocityScale = timeDelta / TIME_DELTA;
    const [posX, posY] = this.position;
    this.position = [posX, posY - this.velocity * velocityScale];
  }

  render(ctx) {
    const [posX, posY] = this.position;
    ctx.drawImage(this.img, posX, posY);

  }

  assignVelocity(vel) {
    this.velocity = vel;
  }
}
