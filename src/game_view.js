// add play/pause functionality;
// Choose song, difficulty?
// Start button

// Need a Time LEFT counter

export default class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.play = false;
  }


  // consider running populateArrows when start game
  // then we can restart by hitting it again
  // Note I added the clearGame function in the arrowGroup
  start() {
    if (this.play) {
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  animate(time) {
    if (this.play) {
      const timeDelta = time - this.lastTime;
      this.game.activateArrow();
      this.game.moveArrows(timeDelta);
      this.game.render(this.ctx);
      this.lastTime = time;

      if (this.game.gameOver()) {
        this.play = false;
        document.getElementById("play").textContent = "Play Again";
      }

      requestAnimationFrame(this.animate.bind(this));
    }
  }
}
