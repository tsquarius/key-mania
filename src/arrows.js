import Sprite from "./sprite";

const DEFAULT_POS = {
  left: [37.5, 500],
  down: [162.5, 500],
  up: [287.5, 500],
  right: [412.5, 500]
};

const TIME_DELTA = 1000 / 60;

export default class Arrows {
  constructor(data) {
    this.direction = data.direction;
    this.position = DEFAULT_POS[this.direction];
    this.velocity = 0;
    this.striked = false;
    this.sprite = new Sprite(data.img);
  }

  move(timeDelta) {
    const velocityScale = timeDelta / TIME_DELTA;
    const [posX, posY] = this.position;
    this.position = [posX, posY - this.velocity * velocityScale];
    if (this.striked) {
      this.sprite.update(timeDelta / TIME_DELTA);
    }
  }

  render(ctx) {
    const [posX, posY] = this.position;
    if (!this.striked) {
      this.sprite.render(ctx, posX, posY);
    } else {
      this.sprite.renderPop(ctx, posX, posY);
    }
  }

  assignVelocity(vel) {
    this.velocity = vel;
  }
}
