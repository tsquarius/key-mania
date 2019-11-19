const REMOVE_ARROW = ["perfect", "great", "good"];

export default class Player {
  constructor(game) {
    this.game = game;
    // to add combo tracker later;
  }

  hitArrow(direction) {
    const target = this.game.arrows[direction].oldestActiveArrow();
    console.log(target);
    console.log(direction);
    if (!target) return;

    if (target.position[1] < 100) {
      const acc = this.checkAccuracy(target.position);
      console.log(acc);
      
      // Checks if player kind of hits it
      if (REMOVE_ARROW.includes(acc)) {
        this.game.removeArrow(direction);
      } 
      //check if player missed it
      else {
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

  render(ctx) {
    ctx.beginPath();
    ctx.rect(0, 60, 500, 40);
    ctx.stroke();
  }
}
