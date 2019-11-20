const SCORE_MAP = {
  perfect: 100,
  great: 80,
  good: 50,
  miss: 0
};

// Add combo + score multiplier later

export default class Score {
  constructor() {
    this.score = 0;
    this.message = "";
  }

  addScore(accuracy) {
    this.score += SCORE_MAP[accuracy];
    this.message = accuracy.toString();
  }

  render() {
    const scoreBoard = document.getElementById("score");
    const message = document.getElementById("message");
    scoreBoard.textContent = this.score;
    message.textContent = this.message;
  }
}
