const REMOVE_ARROW = ["perfect", "great", "good"];

export default class Player {
  constructor(game) {
    this.game = game;
  }

  hitArrow(direction) {
    const target = this.game.arrowsActive[direction][0];
    console.log(target);
    console.log(direction);
    if (!target) return;

    if (target.position[1] < 100) {
      const acc = this.checkAccuracy(target.position);
      console.log(acc);
      if (REMOVE_ARROW.includes(acc)) {
        this.game.removeArrow(direction);
      }
    }
  }

  checkAccuracy(position) {
    const top = position[1];
    const diff = Math.abs(60 - top);

    console.log(diff);
    if (diff <= 1) {
      return "perfect";
    } else if (diff <= 4) {
      return "great";
    } else if (diff <= 7) {
      return "good";
    } else {
      return "miss";
    }
  }

  renderHit(ctx) {
    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    ctx.rect(0, 60, 500, 40);
    ctx.stroke();
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(0, 60, 500, 40);
    ctx.stroke();
  }
}
