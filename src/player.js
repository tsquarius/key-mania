export default class Player {
  constructor(data) {
    this.game = data.game;
    this.score = data.score;
  }

  hitArrow(direction) {
    const target = this.game.arrows[direction].oldestActiveArrow();
    console.log(target);
    console.log(direction);
    if (!target) return;

    // Only consider clicks if it is close to the hit-zone
    if (target.position[1] < 100) {
      const acc = this.checkAccuracy(target.position);
      console.log(acc);
      this.game.removeArrow(direction);
      this.score.addScore(acc);
    }
  }

  checkAccuracy(position) {
    const top = position[1];
    const diff = Math.abs(60 - top);

    console.log(diff);
    if (diff <= 2) {
      return "perfect";
    } else if (diff <= 6) {
      return "great";
    } else if (diff <= 10) {
      return "good";
    } else {
      return "miss";
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(0, 60, 500, 40);
    ctx.stroke();
  }
}
