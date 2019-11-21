// Game over message!

import Game from './game';

const SONG_SETTINGS = {
  jungle: { arrows: 450, velocity: 4.5, frequency: 300 },
  fiji: { arrows: 230, velocity: 2.8, frequency: 400 }
};

export default class GameView {
  constructor(ctx, audio) {
    this.song = null;
    this.game = null;
    this.ctx = ctx;
    this.play = false;
    this.audio = audio;
  }

  selectSong(song) {
    this.play = false;
    this.song = song;
    // this.game = new Game(SONG_SETTINGS[song]);
  }

  start() {
    if (!this.song) return;
    this.play = true;
    this.game = new Game(SONG_SETTINGS[this.song]);
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  // Game is over if player misses too many OR no more arrows
  stopGame() {
    if (this.game.score.missStreak >= 20 || this.game.gameOver()) {
      this.play = false;
      document.getElementById("play").textContent = "Play Again";
      this.audio.stopMusic();
      this.audio.audioElement.currentTime = 0;
    }
  }

  animate(time) {
    if (this.play) {
      const timeDelta = time - this.lastTime;
      this.game.activateArrow();
      this.game.moveArrows(timeDelta);
      this.game.render(this.ctx);
      this.lastTime = time;

      this.stopGame();

      requestAnimationFrame(this.animate.bind(this));
    }
  }
}
