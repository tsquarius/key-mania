const SCORE_MAP = {
  perfect: 100,
  great: 80,
  good: 50,
  miss: 0
};

// Add combo + score multiplier later

export default class Score {
  constructor(game) {
    this.score = 0;
    this.message = "";
    this.combo = 0;
    this.missStreak = 0;
    this.game = game;
  }

  arrowsLeft() {
    let totalArrows = 0;
    Object.values(this.game.arrows).forEach(group => {
      totalArrows += group.arrowsLeft();
    });

    return totalArrows;
  }

  addScore(accuracy) {
    this.score += SCORE_MAP[accuracy];
    this.message = accuracy.toString();
    if (this.message === "miss") {
      this.combo = 0;
      this.missStreak += 1;
    } else {
      this.combo += 1;
      this.missStreak = 0;
    }
  }

  render() {
    const scoreBoard = document.getElementById("score");
    const message = document.getElementById("message");
    const combo = document.getElementById("combo");
    const arrows = document.getElementById("arrows");

    scoreBoard.textContent = this.score;
    message.textContent = this.message;
    combo.textContent = this.combo;
    arrows.textContent = this.arrowsLeft();
    
  }
}
