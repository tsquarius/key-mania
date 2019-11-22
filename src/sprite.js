export default class Sprite {
  constructor(img) {
    this.img = img;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 1;
    this.numberOfFrames = 6;
  }

  update(timeDelta) {
    this.tickCount += 1 * timeDelta;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      } else if (this.frameIndex === this.numberOfFrames - 1) {
        this.img = null;
      }
    }
  }

  render(ctx, posX, posY) {
    ctx.drawImage(this.img, 0, 0, 50, 50, posX, posY, 50, 50);
  }

  renderPop(ctx, posX, posY) {
    if (!this.img) return;
    ctx.drawImage(
      this.img,
      this.frameIndex * 50,
      0,
      50,
      50,
      posX,
      posY,
      50,
      50
    );
  }
}
