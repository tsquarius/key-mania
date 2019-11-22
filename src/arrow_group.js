// This will hold a collection of arrows

export default class ArrowGroup {
  constructor(vel) {
    this.velocity = vel;
    this.queue = [];
    this.active = [];
  }

  arrowsLeft() {
    return this.queue.length + this.active.length;
  }

  addQueue(arrow) {
    this.queue.push(arrow);
  }

  activateArrow() {
    const arrow = this.queue.pop();
    arrow.assignVelocity(this.velocity);
    this.active.push(arrow);
  }

  oldestActiveArrow() {
    return this.active[0];
  }

  removeOutOfBounds() {
    if (this.isEmpty()) return;

    if (this.oldestActiveArrow().position[1] < 15) {
      this.triggerRemoveArrow();
      return true;
    }
    return false;
  }

  triggerRemoveArrow() {
    this.removed = this.active.shift();
  }

  moveActiveArrows(timeDelta) {
    if (this.isEmpty()) return;

    this.active.forEach(arrow => {
      arrow.move(timeDelta);
    });
  }

  isEmpty() {
    return this.active.length === 0;
  }

  haveArrowsInQueue() {
    return this.queue.length > 0;
  }

  renderActiveArrows(ctx) {
    this.active.forEach(arrow => {
      arrow.render(ctx);
    });
  }
}
